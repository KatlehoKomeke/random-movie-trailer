import AWS from 'aws-sdk'
import { WatchlistMutationResponse } from '../declarations/types'
import { logException } from '../utils/exceptions'
const docClient = new AWS.DynamoDB.DocumentClient()

async function deleteWatchlist(email: string):Promise<WatchlistMutationResponse> {
    await docClient.delete({
        TableName: process.env.user_behaviour_table!,
        Key: { 'email' : email }
    })
    .promise()
    .catch((error:Error)=>{
        logException(deleteWatchlist.name,error)
    })
    return {isSuccessful: true}
}

export default deleteWatchlist