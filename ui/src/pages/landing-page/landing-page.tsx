import React, { useEffect, useState } from 'react'
import './landing-page.scss'
import NavBar from '../../components/nav-bar/nav-bar'
import ContentDisplay from '../../components/content-display/content-display'
import { showLoader, tailspin } from '../../components/loader/loader'
import { getContent } from '../../utils/content'
import { initContents } from '../../declarations/consts'
import { redirectIfNotLoggedIn } from '../../utils/auth'
import { redirectToErrorPage } from '../../utils/error'
import { contentsType } from '../../declarations/types'

function LandingPage() {
  
  const [loading, setLoading] = useState(true)
  const [contents,setContents] = useState(initContents)
 
  // Restricted to 500 by third party API
  const totalPages = 500

  useEffect(() => {
      redirectIfNotLoggedIn().then(async () => {
        await fetchMoreData()
      })
      .catch((error:any) => {
        redirectToErrorPage(error?.message)
      })
  },[])

  function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  async function fetchMoreData(){
    debugger
    await getContent(getRandomInt(totalPages))
    .then((contents:contentsType) => {
      setContents({page:contents?.page,results:contents?.results,total_pages:contents?.total_pages,total_results:contents?.total_results})
    })
    .then(() => {
      setLoading(false)
    })
    .catch((error:any) => {
      redirectToErrorPage(error.message)
    })
  }

  const handleScroll = async (e:any) => {
    const bottom = (e.target.scrollHeight - e.target.scrollTop) <= e.target.clientHeight

    if (bottom) { 
      setLoading(true)
      await fetchMoreData()
    }
  }

  function renderInfiniteScroll(){
    return(
        <div className='content-display-container-box' onScroll={handleScroll}>
          {
            contents?.results.map(
              function(data){
                return(<ContentDisplay image={data?.backdrop_path} title={data?.title} id={data?.id}/>)
              }
            )
          }
        </div>
    )
  }

  function renderLandingPage(){
    return(
      <div className="landing-page-container">
        <NavBar showLogo={true} showMenuBtn={true}/>
        {renderInfiniteScroll()}
      </div>
    )
  }
  
  return (
    showLoader(loading,tailspin(),renderLandingPage())
  )
}

export default LandingPage
