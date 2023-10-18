import { Auth } from "aws-amplify"
import { redirectToErrorPage } from "./error"
import { HTTP_METHOD, headers } from "../types/types"
import { jwt } from "./auth"

export async function getWatchlist(movieId:number): Promise<number[]> {
    const email = (await Auth.currentUserInfo())?.attributes.email
    const response = await fetch(process.env.REACT_APP_appsync_url!,{
        method: HTTP_METHOD.POST,
        body: JSON.stringify({
                                query:`query getWatchlistQuery{
                                            getWatchlist(email:"`+email+`"){
                                                watchlist
                                            }
                                        }`
        }),
        headers: {...headers, 'Authorization': await jwt() }
    })

    const responseAsJson = await response.json()
    if(responseAsJson?.errors){
        redirectToErrorPage(responseAsJson?.errors[0].errorType)
    }

    return responseAsJson?.data.getWatchlist.watchlist
}

export async function updateWatchlist(movieId:number):Promise<boolean> {
    const email = (await Auth.currentUserInfo())?.attributes.email
    const response = await fetch(process.env.REACT_APP_appsync_url!,{
        method: HTTP_METHOD.POST,
        body: JSON.stringify({
                                query:`mutation updateWatchlistMutation{
                                            updateWatchlist(movieId:`+movieId+`,email:"`+email+`"){
                                                isSuccessful
                                            }
                                        }`
        }),
        headers: {...headers, 'Authorization': await jwt() }
    })

    const responseAsJson = await response.json()
    if(responseAsJson?.errors){
        redirectToErrorPage(responseAsJson?.errors[0].errorType)
    }

    return responseAsJson?.data.updateWatchlist.isSuccessful
}

export async function deleteWatchlist():Promise<boolean | void> {
    const email = (await Auth.currentUserInfo())?.attributes.email
    const response = await fetch(process.env.REACT_APP_appsync_url!,{
        method: HTTP_METHOD.POST,
        body: JSON.stringify({
                                query:`mutation deleteWatchlistMutation{
                                            deleteWatchlist(email:"`+email+`"){
                                                isSuccessful
                                            }
                                        }`
        }),
        headers: {...headers, 'Authorization': await jwt() }
    })

    const responseAsJson = await response.json()
    if(responseAsJson?.errors){
        return
    }

    return responseAsJson?.data.deleteWatchlist.isSuccessful
}