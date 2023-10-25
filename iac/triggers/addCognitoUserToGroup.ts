// cdk.aws_cognito.UserPool has missing functionality for adding users to a
// group automatically so this function adds users to groups automatically

import { Callback, Context, PostConfirmationTriggerEvent } from "aws-lambda"
import * as AWS from 'aws-sdk'

export async function handler(event: PostConfirmationTriggerEvent, _context: Context, callback: Callback): Promise<void> {
  const { userPoolId, userName } = event
  console.log(`PostConfirmationTriggerEvent: ${event}`)
  console.log(`_context: ${_context}`)
  try {
    await addUserToGroup({
      userPoolId,
      username: userName,
      groupName: "User"
    })

    return callback(null, event)
  } catch (error:any) {
    console.error('error: ',error)
    return callback(error, event)
  }
}

export function addUserToGroup({userPoolId,username,groupName}: {userPoolId: string;username: string;groupName: string;}): Promise<{$response: AWS.Response<Record<string, string>, AWS.AWSError>}> {
  const params = {
    GroupName: groupName,
    UserPoolId: userPoolId,
    Username: username
  }

  const cognitoIdp = new AWS.CognitoIdentityServiceProvider()
  return cognitoIdp.adminAddUserToGroup(params).promise()
}