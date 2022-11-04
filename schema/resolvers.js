import {users} from "../mock-db";
import Domain from "../models/Domain";
import User from "../models/User";

const resolvers = {
    Query: {
        async domains() {
            return Domain.findAll();
        },
        users() {
            return User.findAll();
        },
        user: (_, { id }) => {
            return User.findOne({ where: { id: Number(id) } })
        }
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
        }
    }
}

export default resolvers