import { addUserBehaviour, updateUserWatchlist, userBehaviourExists } from '../utils/watchlist'

async function updateWatchlist(movieId:number,email:string):Promise<{isSuccessful:boolean}>{
    let isSuccesFulUpdate = false
    await userBehaviourExists(email)
    .then(async (userBehaviourExists)=>{
        if(userBehaviourExists?.watchlist.length >= 0) {
            await updateUserWatchlist(movieId,email,userBehaviourExists?.watchlist)
        }else{
            await addUserBehaviour(movieId,email)
            console.log('added user behavior')
        }
        isSuccesFulUpdate = true
    })
    .catch((error)=>{
        console.error('@updateWatchlist -> DynamoDB error name: ', error?.name)
        console.error('@updateWatchlist -> DynamoDB error message: ', error?.message)
        throw new Error("could not update watchlist")
    })
    return {isSuccessful: isSuccesFulUpdate}
}

export default updateWatchlist