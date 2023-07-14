import {createUser, getUser, getUsers} from "../services/user.service";

export const userResolver = {
    Query: {
        async users() {
            return await getUsers();
        },
        async user(_, { id })  {
            return await getUser(id)
        },
    },
    Mutation: {
        createUser: async (_, { input }) => {
            return await createUser(input)
        },
    }
}