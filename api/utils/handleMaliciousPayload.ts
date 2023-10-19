import AWS from "aws-sdk"

const analyzers = [
    {
      description: "Confirm Cognito Identity",
      check: async (appSyncEvent:any) => {
        if (appSyncEvent.arguments?.email) {
            const jwt = appSyncEvent.request.headers.authorization
            const cognitoIdp = new AWS.CognitoIdentityServiceProvider()
            const user = await cognitoIdp.getUser({ AccessToken: jwt }).promise()
            console.log("user: ",user)
        }
      }
    },
    {
        description: "Validate origin",
        check: async (appSyncEvent:any) => {
            if(appSyncEvent.request.headers.origin !== 'https://www.random-movie-trailer.com' && appSyncEvent.request.headers.origin !== 'https://random-movie-trailer.com' && appSyncEvent.request.headers.origin !== 'http://localhost:3000' && appSyncEvent.request.headers.origin !== 'https://eu-central-1.console.aws.amazon.com'){
                throw new Error('invalid origin')
            }
        }
    },
    {
        description: "Validate page",
        check: async (appSyncEvent:any) => {
            if(appSyncEvent.arguments.page && typeof appSyncEvent.arguments.page !== "number"){
                throw new Error('invalid page')
            }
        }
    },
    {
        description: "Validate movieId",
        check: async (appSyncEvent:any) => {
            if(appSyncEvent.arguments.movieId && typeof appSyncEvent.arguments.movieId !== "number"){
                throw new Error('invalid movieId')
            }
        }
    }
]

export default async function handleMaliciousPayload(appSyncEvent:any):Promise<void|never>{
    analyzers.forEach((analyzerObjectType) => {
        analyzerObjectType.check(appSyncEvent)
    })
}