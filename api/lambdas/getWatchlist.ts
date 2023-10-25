import { GetWatchlistResponse } from "../declarations/types"
import { userBehaviourExists } from "../utils/watchlist"

async function getWatchlist(email: string):Promise<GetWatchlistResponse> {
    const item = await userBehaviourExists(email)

    // If the item exists return the watchlist, else retrun an empty array.
    return item && item.watchlist.length > 0 ? { watchlist: item.watchlist } : { watchlist: [] }
}

export default getWatchlist