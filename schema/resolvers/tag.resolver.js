import Shop from "../../models/Shop";
import {Op} from "sequelize";
import Tag from "../../models/Tag";
import Media from "../../models/Media";

export const tagResolver = {
    Query: {
        async tags(_, request, context) {
            const { query, userId, limit } = request
            const where = context.currentShop ? { shop_id: context.currentShop.id } : {}

            if(query && userId) {
                // const userShops = await context.currentUser.getShops()
                const userShops = await Shop.findAll({where: {userId: context.currentUser.id}})

                where.shop_id = {[Op.in]: userShops.map(shop => shop.id)}
                where.title = {[Op.like]: `%${query}%`}
            }

            return Tag.findAll({
                where, limit, include: [{
                    model: Media,
                    as: "Media"
                }]
            })
        },
    },
    Mutation: {
        createTag: async (_, { input }, context) => {
            const default_options = {}

            const data = Object.assign({}, default_options, input)

            const tag = await Tag.create(data)

            context.currentShop.addTag(tag)

            return tag
        },
        deleteTag: async (_, { id }) => {
            return await Tag.destroy({ where: { id } });
        },
        deleteTags: async (_, { ids }) => {
            return await Tag.destroy({ where: { id: ids.map(id => Number(id)) } });
        },
        updateTag: async (_, { patch }) => {
            const filters = {where: {id: Number(patch.filters.id)}};
            const updated = await Tag.update(patch.set, filters)

            if(updated.length) {
                if(patch.media) {
                    const tag = await Tag.findOne(filters)

                    await tag.setMedia([])

                    async function addOrCreateMedia(name, filename) {
                        const filters = { where: {name, filename}};

                        let media = await Media.findOne(filters);

                        if(!media) {
                            media = await Media.create(filters.where)
                        }

                        await tag.addMedia(media)
                    }

                    if(patch.media.image) {
                        await addOrCreateMedia("image", patch.media.image)
                    }
                }
            }

            return updated.length ? updated[0] : false;
        },
    }
}