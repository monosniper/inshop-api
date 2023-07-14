import Domain from "../../models/Domain";
import Shop from "../../models/Shop";
import {Op} from "sequelize";
import Position from "../../models/Position";
import Category from "../../models/Category";
import Media from "../../models/Media";
import Tag from "../../models/Tag";

export const positionResolver = {
    Query: {
        async positions(_, request, context) {
            const { query, limit, offset, host, categoryId } = request
            const where = context.currentShop ? { shop_id: context.currentShop.id } : {}
            console.log(request)
            let shop;

            if(host) {
                const subdomain = host.split('.')[0]
                const domain = await Domain.findOne({ where: { name: [host, subdomain] } })

                if(domain) {
                    shop = await Shop.findOne({where: {domainId: domain.id}})
                }
            }

            if(query) {
                if(context.currentUser) {
                    const userShops = await Shop.findAll({where: {userId: context.currentUser.id}})

                    where.shop_id = {[Op.in]: userShops.map(shop => shop.id)}
                }

                where.title = {[Op.like]: `%${query}%`}
            }

            if(categoryId) {
                console.log("EEE ",categoryId)
                where.category_id = categoryId
            }

            return Position.findAll({
                where, limit, offset, include: [{
                    model: Category,
                    as: "Category",
                    include: [{
                        model: Media,
                        as: "Media"
                    }]
                }, {
                    model: Tag,
                    as: "Tags",
                    include: [{
                        model: Media,
                        as: "Media"
                    }]
                }, {
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
                include: [{
                    model: Category,
                    as: "Category",
                    include: [{
                        model: Media,
                        as: "Media"
                    }]
                }, {
                    model: Tag,
                    as: "Tags",
                    include: [{
                        model: Media,
                        as: "Media"
                    }]
                }, {
                    model: Media,
                    as: "Media"
                }]
            })
        },
    },
    Mutation: {
        createPosition: async (_, { input }, context) => {
            const default_options = {
                inStock: 0,
            }

            const data = Object.assign({}, default_options, input)

            const tags = data.tags
            delete data.tags

            const position = await Position.create(data)
            position.addTags(tags)

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

            const position = await Position.findOne(filters)

            const tagsRemove = await position.getTags()
            await position.removeTags(tagsRemove)
            position.addTags(patch.set.tags)

            if(updated.length) {
                if(patch.media) {
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
    }
}