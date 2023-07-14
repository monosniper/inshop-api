import Review from "../../models/Review";

export const reviewResolver = {
    Query: {
        async reviews(_, { shopId }) {
            const where = shopId ? { shopId: Number(shopId) } : {}

            return Review.findAll({ where });
        },
    },
    Mutation: {

    }
}