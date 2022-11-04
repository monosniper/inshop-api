import {gql} from "apollo-server";

const typeDefs = gql`
    type User {
        id: ID!,
        username: String!
        email: String!
    }

    type Domain {
        id: ID!,
        user_id: ID!,
        name: String!,
        isSubdomain: Boolean!,
    }

    type Position {
        id: ID!,
        type: PositionType!
    }
    
    input CreateUserInput {
        username: String!
        email: String!
    }

    input UpdateUserEmailInput {
        id: ID!
        email: String!
    }
    
    type Mutation {
        createUser(input: CreateUserInput!): User!
        updateUserEmail(input: UpdateUserEmailInput!): User!
    }
    
    type Query {
        domains: [Domain!]!
        users: [User!]!
        user(id: ID!): User!
    }
    
    enum PositionType {
        PRODUCT
        SERVICE
    }
`

export default typeDefs