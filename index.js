import {ApolloServer} from "apollo-server";
import typeDefs from "./schema/type-defs";
import resolvers from "./schema/resolvers";
import db from "./db";
import Shop from "./models/Shop";
import Domain from "./models/Domain";
import CryptoJS from 'crypto-js'
import "./models";
import Module from "./models/Module";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let authToken = null
        let currentShop = null
        console.log(req.body)
        try {
            const authToken  = req.headers.authorization.split(' ')[1]

            if(authToken) {
                const bytes  = CryptoJS.AES.decrypt(authToken, '123');
                const host = bytes.toString(CryptoJS.enc.Utf8);

                if (authToken) {
                    const subdomain = host.split('.')[0]

                    const domain = await Domain.findOne({ where: { name: [host, subdomain] } })

                    currentShop = await Shop.findOne({ where: { domainId: domain.id }})
                }
            } else {
                console.warn(`Unable to authenticate using auth token: ${authToken}. `, e)
            }
        } catch (e) {
            console.warn(`Server warn: `, e)
        }

        return {
            authToken,
            currentShop
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