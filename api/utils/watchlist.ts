import AWS from 'aws-sdk'
import { userBehaviour } from '../declarations/types'
import { logException } from './exceptions'
import * as dotenv from 'dotenv'

// The project is not suppplied with 
// a .env as that is bad practice. 
// So please note that should you wish 
// to run this, you would have to create 
// one.
dotenv.config()

const docClient = new AWS.DynamoDB.DocumentClient()

export async function userBehaviourExists(email:String): Promise<userBehaviour|undefined> {
    const result = await docClient.get({
            TableName: process.env.user_behaviour_table!,
            Key: { 'email' : email }
        })
        .promise()
        .catch((error:Error)=>{
            logException(userBehaviourExists.name,error)
        })

    const Item = result.Item
    
    return Item as userBehaviour|undefined
} 

export async function updateUserWatchlist(movieId:number,email: string,watchlist:number[]):Promise<void> {
    const movieWasWatched = watchlist.some(id => id === movieId)
    if(!movieWasWatched){
        watchlist.push(movieId)
    }
    const currentDate = (new Date()).toJSON()
    await docClient.update({
        TableName: process.env.user_behaviour_table!,
        Key: { 'email': email },
        UpdateExpression: 'SET watchlist = :newWatchlist, lastUpdate = :latestTime',
        ExpressionAttributeValues: {
            ':newWatchlist': watchlist,
            ':latestTime': currentDate
        }
    })
    .promise()
    .catch((error:Error)=>{
        logException(updateUserWatchlist.name,error)
    })
}

export async function addUserBehaviour(movieId:number,email:string):Promise<void> {
    const currentDate = (new Date()).toJSON()
    await docClient.put({
        TableName: process.env.user_behaviour_table!,
        Item: {
            'email': email,
            'createdAt': currentDate,
            'lastUpdate': currentDate,
            'watchlist': [movieId]
        },
        ConditionExpression: 'attribute_not_exists(email)'
    })
    .promise()
    .catch((error:Error)=>{
        logException(addUserBehaviour.name,error)
    })
}