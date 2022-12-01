import {users} from "../mock-db";
import Domain from "../models/Domain";
import User from "../models/User";
import {GraphQLJSON, GraphQLJSONObject} from "graphql-type-json";
import Shop from "../models/Shop";
import Module from "../models/Module";
import Review from "../models/Review";
import Color from "../models/Color";
import Position from "../models/Position";
import ShopFilter from "../models/Filter";
import Category from "../models/Category";
import Filter from "../models/Filter";
import Socialnetwork from "../models/Socialnetwork";

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

        async reviews(_, { shopId }) {
            const where = shopId ? { shopId: Number(shopId) } : {}

            return Review.findAll({ where });
        },

        async shops(_, { userId }) {
            const where = userId ? { userId: Number(userId) } : {}

            return Shop.findAll({ where });
        },
        async shop(_, request, context) {
            const host = request.host
            const subdomain = host.split('.')[0]

            const domain = await Domain.findOne({ where: { name: [host, subdomain] } })

            return domain ? await Shop.findOne({
                where: {domainId: domain.id},
                include: [
                    Module,
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
            return Position.findAll({
                where: { ShopId: context.currentShop.id },
                include: [{
                    model: Category,
                    as: "Category"
                }]
            })
        },
        async categories(_, request, context) {
            return Category.findAll({
                where: { ShopId: context.currentShop.id },
            })
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
            const shop = new Shop({
                ...input
            })

            return shop.save();
        },


        createDomain: (_, { input }) => {
            const domain = new Domain({
                ...input, name: input.name.toLowerCase()
            })

            return domain.save();
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
        updatePosition: async (_, { patch }) => {
            const updated = await Position.update(patch.set, { where: {id: Number(patch.filters.id)} })

            return updated.length ? updated[0] : false;
        },
    }
}

export default resolvers