import AWS from 'aws-sdk'
const docClient = new AWS.DynamoDB.DocumentClient()

async function deleteWatchlist(email: string):Promise<{isSuccessful: boolean}> {
    await docClient.delete({
        TableName: process.env.user_behaviour_table!,
        Key: {
            'email':  email
        }
    })
    .promise()
    .catch((error)=>{
        console.error('@deleteWatchlist -> DynamoDB error name: ', error?.name)
        console.error('@deleteWatchlist -> DynamoDB error message: ', error?.message)
        throw new Error('could not delete watchlist')
    })
    return {isSuccessful: true}
}

export default deleteWatchlist