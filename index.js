import {ApolloServer} from "apollo-server";
import typeDefs from "./schema/type-defs";
import resolvers from "./schema/resolvers";
import db from "./db";
import Shop from "./models/Shop";
import Domain from "./models/Domain";
import CryptoJS from 'crypto-js'
import "./models";
import User from "./models/User";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let authToken = null
        let currentShop = null
        let currentUser = null

        console.log(req.body)

        const userId = req.body.variables.userId

        try {
            const authToken  = req.headers.authorization.split(' ')[1]

            if(authToken) {
                const bytes  = CryptoJS.AES.decrypt(authToken, '123');
                const host = bytes.toString(CryptoJS.enc.Utf8);

                if (authToken) {
                    const subdomain = host.split('.')[0]

                    const domain = await Domain.findOne({ where: { name: [host, subdomain] } })

                    if (domain) currentShop = await Shop.findOne({ where: { domainId: domain.id }})
                    if (userId) currentUser = await User.findOne({ where: { id: userId }})
                }
            } else {
                console.warn(`Unable to authenticate using auth token: ${authToken}. `, e)
            }
        } catch (e) {
            console.warn(`Server warn: `, e)
        }

        return {
            authToken,
            currentShop,
            currentUser,
        }
    }
})

// db.sync()

db.authenticate()
    .then(async () => {
        server.listen().then(({ url }) => {
            console.log('Apollo server has started successfully: ' +  url)
        })
    });