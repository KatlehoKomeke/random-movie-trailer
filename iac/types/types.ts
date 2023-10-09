// 👇 User Pool Client attributes
export const standardCognitoAttributes:{
    email: true,
    emailVerified: true,
    lastUpdateTime: true
} = {
    email: true,
    emailVerified: true,
    lastUpdateTime: true
};

export enum graphqlQueryType {
    Mutation = "Mutation",
    Query = "Query"
}