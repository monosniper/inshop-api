import {gql} from "apollo-server";

const typeDefs = gql`
    scalar JSON
    scalar JSONObject

    type Shop_Module {
        isActive: Boolean!,
    }
    type Module {
        id: ID!,
        price: Int!,
        description: String!,
        title: String!,
        slug: String!,
        Shop_Module: Shop_Module
    }
    
    
    type Category {
        id: ID!,
        uuid: String!,
        title: String!,
    }

    
    type Shop_Color {
        value: String,
    }
    type Color {
        id: ID!,
        name: String!,
        description: String!,
        default_value: String,
        slug: String!,
        Shop_Color: Shop_Color
    }
    
    
    type Filter {
        id: ID!,
        slug: String!
        title: String
    }


    type Shop_Social_network {
        value: String,
    }
    type Socialnetwork {
        id: ID!,
        slug: String!
        Shop_Social_network: Shop_Social_network
    }

    
    type Shop {
        id: ID!,
        uuid: String
        options: JSONObject!
        userId: ID!,
        domainId: ID,
        
        Modules: [Module!]!
        Colors: [Color!]!
        Positions: [Position!]!
        Categories: [Category!]!
        Filters: [Filter!]!
        Socialnetworks: [Socialnetwork!]!
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
    

    type Review {
        id: ID!,
        author_name: String!
        author_url: String!
        content: String!
        rating: Int!
        date: String!
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
        uuid: String!,
        title: String!,
        subtitle: String,
        description: String,
        price: Int,
        discount: Int,
        inStock: Int!,
        discount_type: DiscountType,
        priority: Int!,
        properties: JSONObject!,
        type: PositionType!
        
        Category: Category!
    }
    
    enum DiscountType {
        PERCENT
        AMOUNT
    }

    enum PositionType {
        PRODUCT
        SERVICE
    }


    input CreateDomainInput {
        name: String!
        isSubdomain: Boolean
    }
    
    
    input CreatePositionInput {
        title: String!
        subtitle: String
        description: String
        price: Int
        discount: Int
        inStock: Int
        discount_type: DiscountType
        priority: Int
        properties: JSONObject
        type: PositionType
        CategoryId: ID! 
    }


    type Mutation {
        createUser(input: CreateUserInput!): User!
        updateUserEmail(input: UpdateUserEmailInput!): User!

        createShop(input: CreateShopInput!): Shop!

        createPosition(input: CreatePositionInput!): Position!

        createDomain(input: CreateDomainInput!): Domain!
        
        deletePosition(id: ID!): Boolean!
    }

    type Query {
        reviews(shopId: ID): [Review!]!
        domains: [Domain!]!
        users: [User!]!
        user(id: ID!): User
        shops(userId: ID): [Shop!]!
        shop(host: String!): Shop
        positions: [Position!]!
    }
`

export default typeDefs