import { whitelist_origin } from "../declarations/consts"
import { logException } from "./exceptions"

const analyzers = [
    {
        description: "Validate origin",
        check: (appSyncEvent:any):void|never => {
            if(!whitelist_origin[appSyncEvent.request.headers.origin]){
                logException('invalid origin')
            }
        }
    },
    {
        description: "Validate page",
        check: (appSyncEvent:any):void|never => {
            if(appSyncEvent.arguments.page && typeof appSyncEvent.arguments.page !== "number"){
                logException('invalid page')
            }
        }
    },
    {
        description: "Validate movieId",
        check: (appSyncEvent:any):void|never => {
            if(appSyncEvent.arguments.movieId && typeof appSyncEvent.arguments.movieId !== "number"){
                logException('invalid movieId')
            }
        }
    }
]

export default async function handleMaliciousPayload(appSyncEvent:any):Promise<void|never>{
    analyzers.forEach((analyzerObjectType) => {
        analyzerObjectType.check(appSyncEvent)
    })
}