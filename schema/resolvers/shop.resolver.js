import {Op} from "sequelize";
import Shop from "../../models/Shop";
import Module from "../../models/Module";
import Color from "../../models/Color";
import Filter from "../../models/Filter";
import Tag from "../../models/Tag";
import Media from "../../models/Media";
import Domain from "../../models/Domain";
import Category from "../../models/Category";
import Socialnetwork from "../../models/Socialnetwork";
import Custompage from "../../models/CustomPage";
import Position from "../../models/Position";

export const shopResolver = {
    Query: {
        async shops(_, request, context) {
            const { query, userId, limit } = request
            const where = userId ? { userId: Number(userId) } : {userId: context.currentUser.id}

            if(query && userId) {
                // where[Op.and] = literal(`options->title LIKE "%${query}%"`),
                where['options.title'] = {[Op.like]: `%${query}%`}
            }

            return await Shop.findAll({
                where, limit, include: [
                    Module,
                    Color,
                    Filter,
                    {
                        model: Tag,
                        include: [{
                            model: Media,
                            as: "Media"
                        }]
                    },
                    'Domain',
                    Media
                ]
            })
        },
        async shop(_, request) {
            const { host, query, limit, offset, positions_filter } = request
            const where = {}
            console.log(request)
            if(query) {
                where.title = {[Op.like]: `%${query}%`}
            }

            const subdomain = host.split('.')[0]

            const domain = await Domain.findOne({ where: { name: [host, subdomain] } })

            return domain ? await Shop.findOne({
                where: {domainId: domain.id},
                include: [
                    Module,
                    Media,
                    Color,
                    {
                        model: Category,
                        include: [{
                            model: Media,
                            as: "Media"
                        }]
                    },
                    {
                        model: Tag,
                        include: [{
                            model: Media,
                            as: "Media"
                        }]
                    },
                    Filter,
                    Socialnetwork,
                    Custompage,
                    {
                        model: Position,
                        where, limit, offset,
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
                        }],
                        order: [
                            ['createdAt', 'DESC'],
                        ]
                    },
                ]
            }) : null;
        },
    },
    Mutation: {
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

                    const shopMedia = await shop.getMedia()
                    const favicon = await shopMedia.find(media => media.name === "favicon")
                    const preview = await shopMedia.find(media => media.name === "_preview")

                    async function addOrCreateMedia(name, filename, currentMedia) {
                        if (currentMedia) {
                            await shop.removeMedia(currentMedia)
                        }

                        await shop.addMedia(await Media.create({name, filename}))
                    }

                    if(patch.media.favicon) {
                        await addOrCreateMedia("favicon", patch.media.favicon, favicon)
                    } else {
                        await shop.removeMedia(favicon)
                    }

                    if(patch.media._preview) {
                        await addOrCreateMedia("_preview", patch.media._preview, preview)
                    } else {
                        await shop.removeMedia(preview)
                    }
                }
            }

            return updated.length ? updated[0] : false;
        },
    }
}