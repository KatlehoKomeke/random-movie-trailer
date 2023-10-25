
import getContent from './lambdas/getContent'
import getContentById from './lambdas/getContentById'
import * as dotenv from 'dotenv'
import updateWatchlist from './lambdas/updateWatchlist'
import getWatchlist from './lambdas/getWatchlist'
import deleteWatchlist from './lambdas/deleteWatchlist'
import handleMaliciousPayload from './utils/handleMaliciousPayload'
import { logException } from './utils/exceptions'

// The project is not suppplied with 
// a .env as that is bad practice. 
// So please note that should you wish 
// to run this, you would have to create 
// one.
dotenv.config()

export const handler = async (appSyncEvent:any) => {
    // Cloudwatch logging
    console.log("appSyncEvent: ",appSyncEvent)
    
    handleMaliciousPayload(appSyncEvent)

    switch (appSyncEvent?.info?.fieldName) {
        case "getContent":
            return await getContent(appSyncEvent.arguments.page)
        case "getContentById":
            return await getContentById(appSyncEvent.arguments.movieId)
        case "getWatchlist":
            return await getWatchlist(appSyncEvent.arguments.email)
        case "updateWatchlist":
            return await updateWatchlist(appSyncEvent.arguments.movieId,appSyncEvent.arguments.email)
        case "deleteWatchlist":
            return await deleteWatchlist(appSyncEvent.arguments.email)
        default:
            logException(handler.name)
    }
}