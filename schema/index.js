import { readFileSync } from 'fs'
import * as path from "path";
import {GraphQLJSON, GraphQLJSONObject} from "graphql-type-json";
import {userResolver} from "./resolvers/user.resolver";
import {moduleResolver} from "./resolvers/module.resolver";
import {reviewResolver} from "./resolvers/review.resolver";
import {shopResolver} from "./resolvers/shop.resolver";
import {domainResolver} from "./resolvers/domain.resolver";
import {positionResolver} from "./resolvers/position.resolver";
import {categoryResolver} from "./resolvers/category.resolver";
import {tagResolver} from "./resolvers/tag.resolver";
import {clientResolver} from "./resolvers/client.resolver";

export const typeDefs = `
    scalar JSON
    scalar JSONObject

    ${readFileSync(path.join(__dirname, "./typeDefs/category.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/client.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/color.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/custom_page.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/domain.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/media.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/module.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/position.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/review.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/shop.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/social_network.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/tag.graphql"), {encoding: 'utf-8'})}
    ${readFileSync(path.join(__dirname, "./typeDefs/user.graphql"), {encoding: 'utf-8'})}
`;

export const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Query: {
        ...userResolver.Query,
        ...moduleResolver.Query,
        ...reviewResolver.Query,
        ...shopResolver.Query,
        ...domainResolver.Query,
        ...positionResolver.Query,
        ...categoryResolver.Query,
        ...tagResolver.Query,
        ...clientResolver.Query,
    },
    Mutation: {
        ...userResolver.Mutation,
        ...moduleResolver.Mutation,
        ...reviewResolver.Mutation,
        ...shopResolver.Mutation,
        ...domainResolver.Mutation,
        ...positionResolver.Mutation,
        ...categoryResolver.Mutation,
        ...tagResolver.Mutation,
        ...clientResolver.Mutation,
    }
}