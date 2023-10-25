import axios from 'axios'
import * as dotenv from 'dotenv'
import { axiosConfig, site, video_embed_link } from '../declarations/consts'
import { siteType } from '../declarations/types'
import { logException } from '../utils/exceptions'

// The project is not suppplied with 
// a .env as that is bad practice. 
// So please note that should you wish 
// to run this, you would have to create 
// one.
dotenv.config()

axios.defaults.headers.common['accept'] = 'application/json'
axios.defaults.headers.common['Authorization'] ='Bearer '+process.env.tmdb_api_key!

async function getTitle(movieId:number):Promise<string> {
    let title = ''

    await axios({
        ...axiosConfig,
        url: process.env.tmbd_get_content_by_id_url!+movieId+process.env.tmbd_get_content_by_id_query_params!
    })
    .then((response)=>title = response.data.title)
    .catch((error)=>{
        logException(getTitle.name,error)
    })

    return title
}

async function getLink(movieId:number):Promise<string> {
    let link = ''

    await axios({
        ...axiosConfig,
        url: process.env.tmbd_get_content_by_id_url!+movieId+process.env.tmbd_get_content_by_id_video_params!
    })
    .then(function (response) {
        link = response.data.results.find((element:{site:siteType}) => element.site === site.YouTube)?.key
    })
    .catch((error)=>{
        logException(getLink.name,error)
    })

    return link
}

async function getContentById(movieId: number): Promise<{title:string,link:string;}> {
    const title = await getTitle(movieId)
    const link = await getLink(movieId)

    return {title:title, link:video_embed_link.YouTube+link}
}

export default getContentById