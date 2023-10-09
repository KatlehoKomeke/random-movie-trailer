import { RequestInfo, RequestInit } from 'node-fetch';

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import('node-fetch').then(({ default: fetch }) => fetch(url, init));

// Whenever a module is added or removed 
// this const has to be updated as it
// is used to specify how the lambda function
// should be bundeled by esdbuilds in the iac-stack
export const getContentById_nodeModules: string[] = ['node-fetch']

async function getContentById(id: number): Promise<{title:string,link:string;}>{

    const url = process.env.tmbd_get_content_by_id_url!+id+process.env.tmbd_get_content_by_id_query_params!
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer '+process.env.tmdb_api_key
        }
    }
    
    fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err))

    const response = fetch(url, options).catch(err => {throw new Error(err)})
    return {title:"", link:""}
}

export default getContentById