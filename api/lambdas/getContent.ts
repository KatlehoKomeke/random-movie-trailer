import axios from 'axios'
import * as dotenv from 'dotenv'

// The project is not suppplied with 
// a .env as that is bad practice. 
// So please note that should you wish 
// to run this, you would have to create 
// one.
dotenv.config()

async function getContent(id: number): Promise<{page: number,results: [],total_pages: number,total_results: number}>{

    axios.defaults.headers.common['accept'] = 'application/json'
    axios.defaults.headers.common['Authorization'] ='Bearer '+process.env.tmdb_api_key!

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

    return {page: 0,results: [],total_pages: 0,total_results: 0}
}

export default getContent