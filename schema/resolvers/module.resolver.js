import Module from "../../models/Module";
import Media from "../../models/Media";
import {Op} from "sequelize";

export const moduleResolver = {
    Query: {
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

            if(module_) {
                module_.Dependencies = module_.Dependencies.map(dependency => {
                    if (buyed_modules_ids.includes(dependency.id)) {
                        dependency.buyed = true
                    }

                    return dependency
                })

                const shop_module = buyed_modules.map(m => m.Shop_Module).find(t => t.ModuleId === module_.id)

                if (shop_module) {
                    if(shop_module.isActive) {
                        module_.isActive = true
                        module_.buyed = true
                    }

                    module_.options = shop_module.options
                } else if (buyed_modules_ids.includes(module_.id)) {
                    module_.buyed = true
                }
            }

            return module_
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
            console.log(options)
            const updated = await modules[0].Shop_Module.update({options})

            return !!updated;
        },
    }
}