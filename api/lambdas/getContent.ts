import axios from 'axios'
import * as dotenv from 'dotenv'
import { result } from '../types/types'

// The project is not suppplied with 
// a .env as that is bad practice. 
// So please note that should you wish 
// to run this, you would have to create 
// one.
dotenv.config()

async function getContent(page: number): Promise<{page: number,results: result[],total_pages: number,total_results: number}>{

    axios.defaults.headers.common['accept'] = 'application/json'
    axios.defaults.headers.common['Authorization'] ='Bearer '+process.env.tmdb_api_key!

    let data:{page: number,results: result[],total_pages: number,total_results: number} = {page: 0,results: [],total_pages: 0,total_results: 0}
    
    // GET request contents
    await axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page='+page+'&sort_by=popularity.desc',
        responseType: 'json'
    })
    .then(async function (response) {
        console.log("response: ",response)
    })
    .catch((error)=>{
        throw new Error("error @getContent: "+error.message)
    })

    return data
}

export default getContent