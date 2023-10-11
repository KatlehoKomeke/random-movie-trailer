import axios from 'axios'
import * as dotenv from 'dotenv'
import { video_type } from '../types/types'

// The project is not suppplied with 
// a .env as that is bad practice. 
// So please note that should you wish 
// to run this, you would have to create 
// one.
dotenv.config()

axios.defaults.headers.common['accept'] = 'application/json'
axios.defaults.headers.common['Authorization'] ='Bearer '+process.env.tmdb_api_key!

async function getTitle(id:number){
    let title = ''
    // GET request for title
    await axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/'+id+'?language=en-US',
        responseType: 'json'
    })
    .then(function (response) {
        title = response.data.title
    })
    .catch((error)=>{
        throw new Error("error @title getter: "+error.message)
    })

    return title
}

async function getLink(id:number){
    let link = ''
    // GET request for video link
    await axios({
        method: 'get',
        url: process.env.tmbd_get_content_by_id_url!+id+process.env.tmbd_get_content_by_id_query_params!,
        responseType: 'json'
    })
    .then(function (response) {
        link = response.data.results.find((element)=> element.site === video_type.YouTube)?.key
    })
    .catch((error)=>{
        throw new Error("error @link getter: "+error.message)
    })

    return link
}

async function getContentById(id: number): Promise<{title:string,link:string;}>{

    const title = await getTitle(id)
    const link = await getLink(id)

    return {title:title, link:link}
}

export default getContentById