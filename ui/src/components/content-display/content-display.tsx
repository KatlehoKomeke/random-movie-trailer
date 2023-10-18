import React from 'react'
import './content-display.scss'
import { ContentProps } from '../../types/types';

function ContentDisplay(props: ContentProps) {
  if(props.image !== null){
    return (
      <a className={'content-display-container'} href={'/content?id='+props.id}>
        <h2>{props.title}</h2>
        <div className="content" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${props.image})`}}></div>
      </a>
    )
  }
  return null
}

export default ContentDisplay;
