import { HTTP_METHOD, contentType, contentsType, headers } from "../types/types"
import { jwt } from "./auth"
import { redirectToErrorPage } from "./error"

export async function getContent(page: number):Promise<contentsType>{
    const response = await fetch(process.env.REACT_APP_appsync_url!,{
        method: HTTP_METHOD.POST,
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
        headers: {...headers, 'Authorization': await jwt() }
    })

    const responseAsJson = await response.json()
    if(responseAsJson?.errors){
        redirectToErrorPage(responseAsJson?.errors[0].errorType)
    }

    return responseAsJson?.data?.getContent as contentsType
}

export async function getContentById(id: string):Promise<contentType>{
    const response = await fetch(process.env.REACT_APP_appsync_url!,{
        method: HTTP_METHOD.POST,
        body: JSON.stringify({
            query:`query getContentByIdQuery{
                            getContentById(movieId:`+parseInt(id)+`){
                                link
                                title
                            }
                        }`
        }),
        headers: {...headers, 'Authorization': await jwt() }
    })

    const responseAsJson = await response.json()

    if(responseAsJson?.errors){
        redirectToErrorPage(responseAsJson?.errors[0].errorType)
    }

    if(!responseAsJson.data?.getContentById){
        redirectToErrorPage('could not get trailer')
    }

    return {title:responseAsJson.data?.getContentById?.title,link:responseAsJson.data?.getContentById?.link}
}
