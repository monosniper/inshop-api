import {gql} from "apollo-server";

const typeDefs = gql`
    scalar JSON
    scalar JSONObject

    
#    type Module {
#        id: ID!,
#        price: Int!,
#        description: String!,
#        title: String!,
#        slug: String!,
#        defaultOptions: JSONObject,
#        Shop_Module: Shop_Module
#    }
`

export default typeDefs