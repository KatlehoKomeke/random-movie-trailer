import React, { useEffect, useState } from 'react'
import './content.scss'
import { useSearchParams } from 'react-router-dom'
import NavBar from '../../components/nav-bar/nav-bar'
import { getContentById } from '../../utils/content'
import { redirectIfNotLoggedIn } from '../../utils/auth'
import { showLoader, tailspin } from '../../components/loader/loader'
import { redirectToErrorPage } from '../../utils/error'
import { getWatchlist, updateWatchlist } from '../../utils/watchlist'

function Content() {
    const [searchParams] = useSearchParams()
    const [content,setContent] = useState({title: "",link:""})
    const [loading, setLoading] = useState(true)
    const [contentWasWatched, setContentWasWatched] = useState(false)

    async function loadContent(){
        await getWatchlist(parseInt(searchParams.get('id')!))
        .then(async (watchlist)=>{
            const matchfound = watchlist.find((id)=> id === parseInt(searchParams.get('id')!)) 
            if(matchfound !== undefined && matchfound !== null){
                setContentWasWatched(true)
            }else{
                await updateWatchlist(parseInt(searchParams.get('id')!))
            }
        })
        await getContentById(searchParams.get('id')!)
        .then((content) =>{
            setContent(content)
        })
        .catch((error)=>redirectToErrorPage(error))
    }

    useEffect(() => {
        redirectIfNotLoggedIn()
        .then(async () => await loadContent())
        .then(() => setLoading(false))
    },[])

    function renderContent(){
        return(
            <div className='content-container'>
                <NavBar showBackBtn={true}/>
                <div className='sub-content-container'>
                    <h1>{contentWasWatched ? "You've already seen this trailer." : (content).title}</h1>
                    <div className="iframe-container">
                        {
                            contentWasWatched 
                            ?<h1 onClick={()=>setContentWasWatched(false)}>Continue anyways?</h1>
                            :<iframe width="100%" height="100%" src={content.link} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        }
                    </div>
                </div>            
            </div>
        )
    }

    return (
        showLoader(loading,tailspin(),renderContent())
    )
}

export default Content;

