import {users} from "../mock-db";
import Domain from "../models/Domain";
import User from "../models/User";
import {GraphQLJSON, GraphQLJSONObject} from "graphql-type-json";
import Shop from "../models/Shop";

const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Query: {
        async domains() {
            return Domain.findAll();
        },

        async users() {
            return User.findAll();
        },
        async user(_, { id }) {
            return User.findOne({ where: { id: Number(id) } })
        },

        async shops(_, { userId }) {
            const where = userId ? { userId: Number(userId) } : {}

            return Shop.findAll({ where });
        },
    },
    Mutation: {
        createUser: (_, { input }) => {
            const user = new User({
                ...input
            })

            return user.save();
        },
        updateUserEmail: (_, { input }) => {
            const { id, email } = input

            users.map(user => {
                if(user.id === id) {
                    user.email = email
                }

                return user;
            })

            return users.find(user => user.id === Number(id));
        },

        createShop: (_, { input }) => {
            console.log(input)
            const shop = new Shop({
                ...input
            })

            return shop.save();
        },
    }
}

export default resolvers