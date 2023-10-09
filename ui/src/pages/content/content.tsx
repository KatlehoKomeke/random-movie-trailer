import React, { useEffect, useState } from 'react'
import './content.scss'
import { useSearchParams } from 'react-router-dom'
import NavBar from '../../components/nav-bar/nav-bar'
import { getContentById } from '../../utils/content'

function Content() {
    const [searchParams] = useSearchParams()
    const [content,setContent] = useState({title: "",link:""})

    useEffect(() => {
        getContentById(searchParams.get('id')!).then((content) =>{
            setContent(content)
        })
    },[])

    return (
        <div className='content-container'>
            <NavBar showBackBtn={true}/>
            <div className='sub-content-container'>
                <h1>{(content).title}</h1>
                <div className="iframe-container">
                    <iframe width="100%" height="100%" src={content.link} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </div>            
        </div>
    )
}

export default Content;
