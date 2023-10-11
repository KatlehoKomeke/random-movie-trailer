import { Callback, Context, PostConfirmationTriggerEvent } from "aws-lambda";
import AWS from "aws-sdk";

export async function main(event: PostConfirmationTriggerEvent, _context: Context, callback: Callback): Promise<void> {
  const { userPoolId, userName } = event

  try {
    await addUserToGroup({
      userPoolId,
      username: userName,
      groupName: "User"
    })

    return callback(null, event)
  } catch (error:any) {
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