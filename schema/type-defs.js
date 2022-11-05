import {gql} from "apollo-server";

const typeDefs = gql`
    scalar JSON
    scalar JSONObject

    
    type Shop {
        id: ID!,
        uuid: String
        options: JSONObject!
        userId: ID!,
        domainId: ID,
    }

    input CreateShopInput {
        options: JSONObject!
        userId: ID!
    }
    

    type Domain {
        id: ID!,
        user_id: ID!,
        name: String!,
        isSubdomain: Boolean!,
    }
    

    type User {
        id: ID!,
        username: String!
        email: String!
        password: String!
    }
    
    input CreateUserInput {
        username: String!
        email: String!
        password: String!
    }

    input UpdateUserEmailInput {
        id: ID!
        email: String!
    }
    
    
    type Position {
        id: ID!,
        type: PositionType!
    }
    
    enum PositionType {
        PRODUCT
        SERVICE
    }


    type Mutation {
        createUser(input: CreateUserInput!): User!
        updateUserEmail(input: UpdateUserEmailInput!): User!

        createShop(input: CreateShopInput!): Shop!
    }

    type Query {
        domains: [Domain!]!
        users: [User!]!
        user(id: ID!): User!
        shops(userId: ID): [Shop]!
    }
`

export default typeDefs