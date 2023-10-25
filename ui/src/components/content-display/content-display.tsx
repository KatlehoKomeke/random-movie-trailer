import React from 'react'
import './content-display.scss'
import { ContentProps } from '../../declarations/types';
import { redirectTo } from '../../utils/auth';
import { QueryParams, URL_Redirect } from '../../declarations/consts';
import { imageBuilder } from '../../utils/images';

function ContentDisplay(props: ContentProps) {
  if(props.image !== null){
    return (
      <div className='content-display-container'>
        <h2>{props.title}</h2>
        <div className="content" onClick={()=>redirectTo(URL_Redirect.Content+QueryParams.id+props.id)}style={{backgroundImage: imageBuilder(props.image)}}></div>
      </div>
    )
  }
  return null
}

export default ContentDisplay
