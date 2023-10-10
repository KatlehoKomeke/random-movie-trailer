
import getContentById from './lambdas/getContentById'
import * as dotenv from 'dotenv'

// The project is not suppplied with 
// a .env as that is bad practice. 
// So please note that should you wish 
// to run this, you would have to create 
// one.
dotenv.config()

export const handler = async (appSyncEvent:any) => {
    console.log("appSyncEvent: ",appSyncEvent)
    
    switch (appSyncEvent?.info?.fieldName) {
        case "getContentById":
            return await getContentById(appSyncEvent.arguments.id)
        default:
            throw new Error('invalid request')
    }
}