export const standardCognitoAttributes = {
    email: true,
    emailVerified: true,
    lastUpdateTime: true
} as const

export const graphqlQueryType = {
    Mutation: "Mutation",
    Query: "Query"
} as const