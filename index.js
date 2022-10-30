import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import schema from './schema'
import { graphqlHTTP } from 'express-graphql'

dotenv.config();

const app = express()

app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.listen(process.env.APP_PORT, () => {
    console.log('Server started at http://localhost:' + process.env.APP_PORT)
})