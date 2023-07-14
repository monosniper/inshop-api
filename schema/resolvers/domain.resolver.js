import Shop from "../../models/Shop";
import Sequelize from "sequelize";
import Domain from "../../models/Domain";

export const domainResolver = {
    Query: {
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
    },
    Mutation: {
        createDomain: (_, { input }) => {
            const domain = new Domain({
                ...input, name: input.name.toLowerCase()
            })

            return domain.save();
        },
        deleteDomain: async (_, { id }) => {
            return await Domain.destroy({ where: { id } });
        },
    }
}