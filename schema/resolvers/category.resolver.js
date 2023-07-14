import Shop from "../../models/Shop";
import {Op} from "sequelize";
import Category from "../../models/Category";
import Media from "../../models/Media";

export const categoryResolver = {
    Query: {
        async categories(_, request, context) {
            const { query, userId, limit } = request
            const where = context.currentShop ? { shop_id: context.currentShop.id } : {}

            if(query && userId) {
                // const userShops = await context.currentUser.getShops()
                const userShops = await Shop.findAll({where: {userId: context.currentUser.id}})

                where.shop_id = {[Op.in]: userShops.map(shop => shop.id)}
                where.title = {[Op.like]: `%${query}%`}
            }

            return Category.findAll({
                where, limit, include: [{
                    model: Media,
                    as: "Media"
                }]
            })
        },
    },
    Mutation: {
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
    }
}