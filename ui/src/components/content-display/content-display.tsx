import React from 'react'
import './content-display.scss'
import { ContentProps } from '../../types/types';
import { redirectTo } from '../../utils/auth';

function ContentDisplay(props: ContentProps) {
  if(props.image !== null){
    return (
      <div className='content-display-container'>
        <h2>{props.title}</h2>
        <div className="content" onClick={()=>redirectTo('/content?id='+props.id)}style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${props.image})`}}></div>
      </div>
    )
  }
  return null
}

export default ContentDisplay;
