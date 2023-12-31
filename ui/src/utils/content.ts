import { HTTP_METHOD, headers } from "../declarations/consts"
import { contentType, contentsType } from "../declarations/types"
import { jwt } from "./auth"
import { redirectToErrorPage } from "./error"

export async function getContent(page: number):Promise<contentsType> {
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

export async function getContentById(movieId: number):Promise<contentType> {
    const response = await fetch(process.env.REACT_APP_appsync_url!,{
        method: HTTP_METHOD.POST,
        body: JSON.stringify({
            query:`query getContentByIdQuery{
                            getContentById(movieId:`+movieId+`){
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

    return responseAsJson.data?.getContentById as contentType
}
