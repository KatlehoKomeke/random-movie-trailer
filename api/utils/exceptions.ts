import { exceptions_list } from "../declarations/consts"

export function logException(uniqueIdOrErrorMessage: string, error?: Error):never{
    // Cloudwatch logging
    if(error){ 
        console.error(`@${uniqueIdOrErrorMessage} -> `, error?.message)
    }
    throw new Error(exceptions_list[uniqueIdOrErrorMessage] ?? uniqueIdOrErrorMessage)
}