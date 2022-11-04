import {ApolloServer} from "apollo-server";
import typeDefs from "./schema/type-defs";
import resolvers from "./schema/resolvers";
import db from "./db";
import Domain from "./models/Domain";
import User from "./models/User";

const server = new ApolloServer({
    typeDefs, resolvers
})

db.sync().then(async () => {
    // const user = new User({
    //     username: 'nigga',
    // })

    // const domain = new Domain({
    //     name: 'hello',
    //     UserId: 1,
    // })

    // await user.save()
    // await domain.save()

    // console.info(await User.findAll())
    // console.info(await User.findOne({ where: { id: Number(1) } }))

    server.listen().then(({ url }) => {
        console.log('Apollo server has started successfully: ' +  url)
    })
});