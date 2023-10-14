import { Auth } from "aws-amplify";
import { contentType, contentsType } from "../types/types";
import { redirectToErrorPage } from "./error";

export async function getContent(page: number):Promise<contentsType>{
    debugger
    const response = await fetch(process.env.REACT_APP_appsync_url!,{
        method: 'POST',
        body: JSON.stringify({
                                query:`query getContentByIdQuery{
                                            getContent(page:`+page+`){
                                                page
                                                total_pages
                                                total_results
                                                results {
                                                  id
                                                  backdrop_path
                                                  title
                                                }
                                            }
                                        }`
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': (await Auth.currentAuthenticatedUser())?.signInUserSession?.accessToken?.jwtToken!
        }
    })

    const responseAsJson = await response.json()
    console.log("respomseAsJson: ",responseAsJson)
    if(responseAsJson?.errors){
        redirectToErrorPage(responseAsJson?.errors[0].errorType)
    }

    return { 
        page: responseAsJson.data.getContent.page,
        results: responseAsJson.data.getContent.results,
        total_pages: responseAsJson.data.getContent.total_pages,
        total_results: responseAsJson.data.getContent.total_results
     }
}

export async function getContentById(id: string):Promise<contentType>{
    const response = await fetch(process.env.REACT_APP_appsync_url!,{
        method: 'POST',
        body: JSON.stringify({
            query:`query getContentByIdQuery{
                            getContentById(id:`+parseInt(id)+`){
                                link
                                title
                            }
                        }`
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': (await Auth.currentAuthenticatedUser())?.signInUserSession?.accessToken?.jwtToken
        }
    })

    const responseAsJson = await response.json()
    if(responseAsJson?.errors){
        redirectToErrorPage(responseAsJson?.errors[0].errorType)
    }

    return {title:responseAsJson.data.getContentById.title,link:"https://www.youtube.com/embed/"+responseAsJson.data.getContentById.link}
}