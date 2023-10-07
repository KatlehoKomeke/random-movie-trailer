

import * as AWS from 'aws-sdk'
const docClient = new AWS.DynamoDB.DocumentClient()

// Whenever a module is added or removed 
// this const has to be updated as it
// is used to specify how the lambda function
// should be bundeled by esdbuilds in the iac-stack
export const nodeModules: string[] = ["aws-sdk"]

async function signUp(email: string,password: string):Promise<{email:string}> {
    try {
        const currentDate = (new Date()).toJSON()
        await docClient.transactWrite({
            TransactItems:[
                {
                    Put:{
                        TableName: process.env.user_table!,
                        Item: {
                            "email": email,
                            "createdAt": currentDate,
                            "lastLogin": currentDate,
                        },
                        ConditionExpression: "attribute_not_exists(email)"
                    }
                }
            ]
        }).promise()
        return {email:email}
    } catch (err:any) {
        throw new Error(err?.message)
    }
}

export default signUp;