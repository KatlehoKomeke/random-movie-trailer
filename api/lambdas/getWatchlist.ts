import { userBehaviourExists } from "../utils/watchlist"

async function getWatchlist(email: string):Promise<{watchlist:number[]} | undefined>{
    const item = await userBehaviourExists(email) as {[key: string]: any, watchlist: number[]} 
    return item && item.watchlist.length > 0 ? { watchlist: item.watchlist! } : { watchlist: [] }
}

export default getWatchlist