import Domain from "../models/Domain";
import User from "../models/User";
import {GraphQLJSON, GraphQLJSONObject} from "graphql-type-json";
import Shop from "../models/Shop";
import Module from "../models/Module";
import Review from "../models/Review";
import Color from "../models/Color";
import Position from "../models/Position";
import ShopFilter from "../models/Filter";
import Client from "../models/Client";
import Category from "../models/Category";
import Filter from "../models/Filter";
import Socialnetwork from "../models/Socialnetwork";
import Media from "../models/Media";
import {hashPassword} from "../utils/hashPassword";
import ModuleDependency from "../models/ModuleDependency";
import {Shop_Module_through as Shop_Module} from "../models";
import Sequelize, {Op} from "sequelize";

const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Query: {
        async users() {
            return User.findAll();
        },
        async user(_, { id }) {
            return User.findOne({ where: { id: Number(id) } })
        },

        async module(_, { slug }, context) {
            let buyed_modules = await context.currentShop.getModules()
            const buyed_modules_ids = buyed_modules.map(module => module.id)

            const module_ = await Module.findOne({
                where: { slug },
                include: [
                    {
                        model: Media,
                        as: "Media"
                    },
                    {
                        model: Module,
                        as: "Dependencies",
                        include: [
                            {
                                model: Media,
                                as: 'Media'
                            },
                            {
                                model: Module,
                                as: "Dependencies",
                            }
                        ]
                    }
                ]
            })

            module_.Dependencies = module_.Dependencies.map(dependency => {
                if (buyed_modules_ids.includes(dependency.id)) {
                    dependency.buyed = true
                }

                return dependency
            })

            const shop_module = buyed_modules.map(m => m.Shop_Module).find(t => t.ModuleId === module_.id)

            if (shop_module && shop_module.isActive) {
                module_.isActive = true
                module_.buyed = true
            } else if (buyed_modules_ids.includes(module_.id)) {
                module_.buyed = true
            }

            module_.options = shop_module.options

            return module_
        },

        async reviews(_, { shopId }) {
            const where = shopId ? { shopId: Number(shopId) } : {}

            return Review.findAll({ where });
        },

        async shops(_, { userId }) {
            const where = userId ? { userId: Number(userId) } : {}

            return Shop.findAll({
                where,
                include: [
                    Module,
                    Color,
                    Filter,
                    'Domain',
                    Media
                ]
            });
        },
        async domains(_, { userId, notUsed=false }) {
            const where = {}

            if(userId) where.user_id = Number(userId)
            if(notUsed) {
                const shops = await Shop.findAll({where: {user_id: Number(userId)}})
                const used_domain_ids = shops.map(shop => shop.domainId)
                if(used_domain_ids.length) where.id = {[Sequelize.Op.notIn]: used_domain_ids}
            }

            return Domain.findAll({ where });
        },
        async shop(_, request, context) {
            const host = request.host
            const subdomain = host.split('.')[0]

            const domain = await Domain.findOne({ where: { name: [host, subdomain] } })

            return domain ? await Shop.findOne({
                where: {domainId: domain.id},
                include: [
                    Module,
                    Media,
                    Color,
                    Category,
                    Filter,
                    Socialnetwork,
                    {
                        model: Position,
                        include: [{
                            model: Category,
                            as: "Category"
                        }]
                    },
                ]
            }) : null;
        },

        async positions(_, request, context) {
            const { query, userId, limit } = request
            const where = context.currentShop ? { ShopId: context.currentShop.id } : {}

            if(query && userId) {
                const userShops = await context.currentUser.getShops()

                where.shop_id = {[Op.in]: userShops.map(shop => shop.id)}
                where.title = {[Op.like]: `%${query}%`}
            }

            return Position.findAll({
                where, limit, include: [{
                    model: Category,
                    as: "Category",
                    include: [{
                        model: Media,
                        as: "Media"
                    }]
                },{
                    model: Media,
                    as: "Media"
                }],
                order: [
                    ['createdAt', 'DESC'],
                ]
            })
        },
        async position(_, { id }) {
            return await Position.findOne({
                where: { id: Number(id) },
                include: ['Category', Media]
            })
        },
        async categories(_, request, context) {
            const { query, userId, limit } = request
            const where = context.currentShop ? { ShopId: context.currentShop.id } : {}

            if(query && userId) {
                const userShops = await context.currentUser.getShops()

                where.shop_id = {[Op.in]: userShops.map(shop => shop.id)}
                where.title = {[Op.like]: `%${query}%`}
            }

            return Category.findAll({
                where, include: [{
                    model: Media,
                    as: "Media"
                }]
            })
        },
        async clients(_, request, context) {
            return Client.findAll({
                where: { ShopId: context.currentShop.id },
                include: [{
                    model: Media,
                    as: "Media"
                }]
            })
        },
        async modules(_, request, context) {
            const include = [
                {
                    model: Media,
                    as: "Media"
                },
                {
                    model: Module,
                    as: "Dependencies",
                    include: [
                        {
                            model: Module,
                            as: "Dependencies",
                        }
                    ]
                }
            ]

            const { buyed, query, limit } = request
            const where = {}

            if(query) {
                where.title = {[Op.like]: `%${query}%`}
            }

            if(buyed) {
                const modules = await context.currentShop.getModules({
                    where, include, limit
                })

                return modules.map(module => {
                    module.isActive = module.Shop_Module.isActive
                    return module
                })
            }
            else {
                const all_modules = await Module.findAll({
                    where, include, limit
                });

                if(context.currentShop) {
                    let buyed_modules = await context.currentShop.getModules()
                    buyed_modules = buyed_modules.map(module => module.id)

                    return all_modules.map(async (module) => {
                        if (buyed_modules.includes(module.id)) {
                            module.buyed = true
                        }
                        return module;
                    })
                } else {
                    return all_modules
                }
            }
        },
    },
    Mutation: {
        createUser: async (_, { input }) => {
            input.password = await hashPassword(input.password)

            const user = new User({
                ...input
            })

            return user.save();
        },
        updateUserEmail: (_, { input }) => {
            // const { id, email } = input
            //
            // users.map(user => {
            //     if(user.id === id) {
            //         user.email = email
            //     }
            //
            //     return user;
            // })
            //
            // return users.find(user => user.id === Number(id));
        },

        createShop: async (_, { input }) => {
            const default_options = {}
            const data = Object.assign({}, default_options, input)

            return await Shop.create(data)
        },
        deleteShop: async (_, { id }) => {
            return await Shop.destroy({ where: { id } });
        },
        updateShop: async (_, { patch }) => {
            const filters = {where: {id: Number(patch.filters.id)}};

            const updated = await Shop.update(patch.set, filters)

            if(updated.length) {
                if(patch.media) {
                    const shop = await Shop.findOne(filters)

                    await shop.setMedia([])

                    async function addOrCreateMedia(name, filename) {
                        const filters = { where: {name, filename}};

                        let media = await Media.findOne(filters);

                        if(!media) {
                            media = await Media.create(filters.where)
                        }

                        await client.addMedia(media)
                    }

                    if(patch.media.avatar) {
                        await addOrCreateMedia("avatar", patch.media.avatar)
                    }
                }
            }

            return updated.length ? updated[0] : false;
        },


        createDomain: (_, { input }) => {
            const domain = new Domain({
                ...input, name: input.name.toLowerCase()
            })

            return domain.save();
        },
        deleteDomain: async (_, { id }) => {
            return await Domain.destroy({ where: { id } });
        },

        createPosition: async (_, { input }, context) => {
            const default_options = {
                inStock: 0,
            }

            const data = Object.assign({}, default_options, input)

            const position = await Position.create(data)

            context.currentShop.addPosition(position)

            return position
        },
        deletePosition: async (_, { id }) => {
            return await Position.destroy({ where: { id } });
        },
        deletePositions: async (_, { ids }) => {
            return await Position.destroy({ where: { id: ids.map(id => Number(id)) } });
        },
        updatePosition: async (_, { patch }) => {
            const filters = {where: {id: Number(patch.filters.id)}};
            const updated = await Position.update(patch.set, filters)

            if(updated.length) {
                if(patch.media) {
                    const position = await Position.findOne(filters)

                    await position.setMedia([])

                    async function addOrCreateMedia(name, filename) {
                        const filters = { where: {name, filename}};

                        let media = await Media.findOne(filters);

                        if(!media) {
                            media = await Media.create(filters.where)
                        }

                        await position.addMedia(media)
                    }

                    if(patch.media.thumb_name) {
                        await addOrCreateMedia("thumb", patch.media.thumb_name)
                    }

                    if(patch.media.images) {
                        patch.media.images.forEach(async (filename) => {
                            await addOrCreateMedia("image", filename)
                        })
                    }
                }
            }

            return updated.length ? updated[0] : false;
        },
        createCategory: async (_, { input }, context) => {
            const default_options = {}

            const data = Object.assign({}, default_options, input)

            const category = await Category.create(data)

            context.currentShop.addCategory(category)

            return category
        },
        deleteCategory: async (_, { id }) => {
            return await Category.destroy({ where: { id } });
        },
        deleteCategories: async (_, { ids }) => {
            return await Category.destroy({ where: { id: ids.map(id => Number(id)) } });
        },
        updateCategory: async (_, { patch }) => {
            const filters = {where: {id: Number(patch.filters.id)}};
            const updated = await Category.update(patch.set, filters)

            if(updated.length) {
                if(patch.media) {
                    const category = await Category.findOne(filters)

                    await category.setMedia([])

                    async function addOrCreateMedia(name, filename) {
                        const filters = { where: {name, filename}};

                        let media = await Media.findOne(filters);

                        if(!media) {
                            media = await Media.create(filters.where)
                        }

                        await category.addMedia(media)
                    }

                    if(patch.media.image) {
                        await addOrCreateMedia("image", patch.media.image)
                    }
                }
            }

            return updated.length ? updated[0] : false;
        },

        createModule: async (_, { input }, context) => {
            const default_options = {}

            const data = Object.assign({}, default_options, input)

            const module = await Module.create(data)

            context.currentShop.addModule(module)

            return module
        },
        deleteModule: async (_, { id }) => {
            return await Module.destroy({ where: { id } });
        },
        deleteModules: async (_, { ids }) => {
            return await Module.destroy({ where: { id: ids.map(id => Number(id)) } });
        },
        updateModule: async (_, { patch }) => {
            const filters = {where: {id: Number(patch.filters.id)}};
            const updated = await Module.update(patch.set, filters)

            if(updated.length) {
                if(patch.media) {
                    const module = await Module.findOne(filters)

                    await module.setMedia([])

                    async function addOrCreateMedia(name, filename) {
                        const filters = { where: {name, filename}};

                        let media = await Media.findOne(filters);

                        if(!media) {
                            media = await Media.create(filters.where)
                        }

                        await module.addMedia(media)
                    }

                    if(patch.media.image) {
                        await addOrCreateMedia("image", patch.media.image)
                    }
                }
            }

            return updated.length ? updated[0] : false;
        },

        activateModule: async (_, { id }, context) => {
            const modules = await context.currentShop.getModules({where: {id}})
            const updated = await modules[0].Shop_Module.update({isActive: true})

            return !!updated;
        },

        deactivateModule: async (_, { id }, context) => {
            const modules = await context.currentShop.getModules({where: {id}})
            const updated = await modules[0].Shop_Module.update({isActive: false})

            return !!updated;
        },

        buyModule: async (_, { id }, context) => {
            const buyed = await context.currentShop.addModule(id)

            return !!buyed
        },

        saveModule: async (_, { input }, context) => {
            const {id, options} = input
            const modules = await context.currentShop.getModules({where: {id}})
            const updated = await modules[0].Shop_Module.update({options})

            return !!updated;
        },

        createClient: async (_, { input }, context) => {
            const default_options = {}

            const data = Object.assign({}, default_options, input)

            data.password = await hashPassword(data.password)

            const client = await Client.create(data)

            context.currentShop.addClient(client)

            return client
        },
        deleteClient: async (_, { id }) => {
            return await Client.destroy({ where: { id } });
        },
        deleteClients: async (_, { ids }) => {
            return await Client.destroy({ where: { id: ids.map(id => Number(id)) } });
        },
        updateClient: async (_, { patch }) => {
            const filters = {where: {id: Number(patch.filters.id)}};

            if (patch.set.password) {
                patch.set.password = await hashPassword(patch.set.password)
            }

            const updated = await Client.update(patch.set, filters)

            if(updated.length) {
                if(patch.media) {
                    const client = await Client.findOne(filters)

                    await client.setMedia([])

                    async function addOrCreateMedia(name, filename) {
                        const filters = { where: {name, filename}};

                        let media = await Media.findOne(filters);

                        if(!media) {
                            media = await Media.create(filters.where)
                        }

                        await client.addMedia(media)
                    }

                    if(patch.media.avatar) {
                        await addOrCreateMedia("avatar", patch.media.avatar)
                    }
                }
            }

            return updated.length ? updated[0] : false;
        },
    }
}

export default resolvers