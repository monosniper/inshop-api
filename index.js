import {ApolloServer} from "apollo-server";
import db from "./db";
import Shop from "./models/Shop";
import Domain from "./models/Domain";
import CryptoJS from 'crypto-js'
import "./models";
import User from "./models/User";
import {resolvers, typeDefs} from "./schema";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const authToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        let currentShop = null
        let currentUser = null
        const isAdmin = !!req.headers.ADMIN_KEY

        console.log(req.body)
        console.log(req.headers.authorization)

        const userId = req.body.variables.userId

        try {
            if(authToken) {
                const bytes  = CryptoJS.AES.decrypt(authToken, '123');
                const host = bytes.toString(CryptoJS.enc.Utf8);
                console.log(host)
                if (authToken) {
                    const subdomain = host.split('.')[0]

                    const domain = await Domain.findOne({ where: { name: [host, subdomain] } })

                    if (domain) currentShop = await Shop.findOne({ where: { domainId: domain.id }})
                    if (userId) currentUser = await User.findOne({ where: { id: userId }})
                }
            } else {
                console.warn(`Unable to authenticate using auth token: ${authToken}. `)
            }
        } catch (e) {
            console.warn(`Server warn: `, e)
        }

        return {
            currentShop,
            currentUser,
            isAdmin,
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