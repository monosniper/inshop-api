import {hashPassword} from "../../utils/hashPassword";
import Client from "../../models/Client";
import Media from "../../models/Media";

export const clientResolver = {
    Query: {
        async clients(_, request, context) {
            return Client.findAll({
                where: { ShopId: context.currentShop.id },
                include: [{
                    model: Media,
                    as: "Media"
                }]
            })
        },
    },
    Mutation: {
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