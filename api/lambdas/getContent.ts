import axios from 'axios'
import * as dotenv from 'dotenv'
import { Contents } from '../declarations/types'
import { axiosConfig, initContent } from '../declarations/consts'
import { logException } from '../utils/exceptions'

// The project is not suppplied with 
// a .env as that is bad practice. 
// So please note that should you wish 
// to run this, you would have to create 
// one.
dotenv.config()

axios.defaults.headers.common['accept'] = 'application/json'
axios.defaults.headers.common['Authorization'] ='Bearer '+process.env.tmdb_api_key!

async function getContent(page: number): Promise<Contents>{
    let data = initContent
    
    await axios({
        ...axiosConfig,
        url: process.env.tmbd_get_content_url!+page+process.env.tmbd_get_content_query_params!
    })
    .then((response)=> {
        data = response.data
    })
    .catch((error:Error)=>{
        logException(getContent.name,error)
    })

    return {
            page: data.page,
            results: data.results,
            total_pages: data.total_pages,
            total_results: data.total_results
           }
}

export default getContent