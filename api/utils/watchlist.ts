import AWS from 'aws-sdk'
const docClient = new AWS.DynamoDB.DocumentClient()

export async function userBehaviourExists(email:String): Promise<{[key: string]: any} | undefined>{
    const result = await docClient.get({
            TableName: process.env.user_behaviour_table!,
            Key: {
                'email':  email
            }
        })
        .promise()
        .catch((error)=>{
            console.error('@userBehaviourExists -> DynamoDB error name: ', error?.name)
            console.error('@userBehaviourExists -> DynamoDB error message: ', error?.message)
            throw new Error('could resolve watchlist')
        })

    const Item = result.Item
    
    return Item
} 

export async function updateUserWatchlist(movieId:number,email: string,watchlist:number[]):Promise<void> {
    
    const currentDate = (new Date()).toJSON()
    const movieWasWashed = watchlist.find(id => id === movieId)
    movieWasWashed ? null : watchlist.push(movieId)

    await docClient.update({
        TableName: process.env.user_behaviour_table!,
        Key: {
            'email':  email
        },
        UpdateExpression: 'SET watchlist = :newWatchlist, lastUpdate = :latestTime',
        ExpressionAttributeValues: {
            ':newWatchlist': watchlist,
            ':latestTime': currentDate
        }
    })
    .promise()
    .catch((error)=>{
        console.error('@updateUserBehaviour -> DynamoDB error name: ', error?.name)
        console.error('@updateUserBehaviour -> DynamoDB error message: ', error?.message)
        throw new Error('could not update watchlist')
    })
}

export async function addUserBehaviour(movieId:number,email: string,):Promise<void> {
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
    .catch((error)=>{
        console.error('@addUserBehaviour -> DynamoDB error name: ', error?.name)
        console.error('@addUserBehaviour -> DynamoDB error message: ', error?.message)
        throw new Error('could not add new watchlist')
    })
}