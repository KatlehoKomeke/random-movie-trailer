import React, { useEffect, useState } from 'react'
import './landing-page.scss'
import NavBar from '../../components/nav-bar/nav-bar'
import ContentDisplay from '../../components/content-display/content-display'
import { showLoader, tailspin } from '../../components/loader/loader'
import { getContent } from '../../utils/content'
import { initResults } from '../../types/types'
import { redirectIfNotLoggedIn } from '../../utils/auth'
import { redirectToErrorPage } from '../../utils/error'

function LandingPage() {
  
  const [loading, setLoading] = useState(true)
  const [contents,setContents] = useState({page:0,results:[initResults],total_pages:0,total_results:0})

  useEffect(() => {
      redirectIfNotLoggedIn().then(async () => {
        await getContent(1).then((contents:any) =>{
          setContents({page:contents.page,results:contents.results,total_pages:contents.total_pages,total_results:contents.total_results})
          setLoading(false)
        })
      })
      .catch((error:any) => {
        redirectToErrorPage(error?.message)
      })
  },[])

  function renderLandingPage(){
    return(
      <div className="landing-page-container">
        <NavBar showLogo={true} showMenuBtn={true}/>
        <div className='content-display-container-box'>
          {
            contents.results.map(
              function(data){
                return(<ContentDisplay image={'https://image.tmdb.org/t/p/w500/'+data.backdrop_path} title={data.title} id={data.id}/>)
              }
            )
          }
        </div>
      </div>
    )
  }
  return (
    showLoader(loading,tailspin(),renderLandingPage())
  )
}

export default LandingPage;
