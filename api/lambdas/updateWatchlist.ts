import { watchlist } from '../declarations/consts'
import { WatchlistMutationResponse } from '../declarations/types'
import { logException } from '../utils/exceptions'
import { addUserBehaviour, updateUserWatchlist, userBehaviourExists } from '../utils/watchlist'

async function updateWatchlist(movieId:number,email:string):Promise<WatchlistMutationResponse>{
    let isSuccesFulUpdate = false

    await userBehaviourExists(email)
    .then(async (userBehaviourExists)=>{

        // If the table has an item matching 
        // the given email update the watchlist
        // or else add an item
        userBehaviourExists && userBehaviourExists?.watchlist?.length >= watchlist.minimumSize
        ?await updateUserWatchlist(movieId,email,userBehaviourExists?.watchlist)
        :await addUserBehaviour(movieId,email)
        
        isSuccesFulUpdate = true
    })
    .catch((error:Error)=>{
        logException(updateWatchlist.name,error)
    })
    
    return {isSuccessful: isSuccesFulUpdate}
}

export default updateWatchlist