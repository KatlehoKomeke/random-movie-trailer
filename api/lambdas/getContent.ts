import axios from 'axios'
import * as dotenv from 'dotenv'
import { Contents } from '../types/types'

// The project is not suppplied with 
// a .env as that is bad practice. 
// So please note that should you wish 
// to run this, you would have to create 
// one.
dotenv.config()

axios.defaults.headers.common['accept'] = 'application/json'
axios.defaults.headers.common['Authorization'] ='Bearer '+process.env.tmdb_api_key!

async function getContent(page: number): Promise<Contents>
{

    let data = {
                page: 0,
                results: [ {
                    adult: false,
                    backdrop_path: "",
                    genre_ids: [0],
                    id: 0,
                    original_language: "",
                    original_title: "",
                    overview: "",
                    popularity: 0,
                    poster_path: "",
                    release_date: "",
                    title: "",
                    video: true,
                    vote_average: 0,
                    vote_count: 0
                }],
                total_pages: 0,
                total_results: 0
              }
    
    // GET request contents
    await axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/discover/movie?page='+page+'&sort_by=popularity.desc',
        responseType: 'json'
    })
    .then((response)=> {
        if(response.data){
            data = response.data
            console.log("data @getContent: ",data)
        }else{
            throw new Error('response is empty :(')
        }
    })
    .catch((error)=>{
        throw new Error("error @getContent: "+error.message)
    })

    return {
            page: data.page,
            results: data.results,
            total_pages: data.total_pages,
            total_results: data.total_results
           }
}

export default getContent