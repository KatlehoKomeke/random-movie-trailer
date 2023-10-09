import React from 'react'
import './content-display.scss'
import { ContentProps } from '../../types/types';

function ContentDisplay(props: ContentProps) {
  return (
    <a className={'content-display-container'} href={'/content?id='+props.id}>
      <h2>{props.title}</h2>
      <div className="content" style={{backgroundImage: `url(${props.image})`}}></div>
    </a>
  )
}

export default ContentDisplay;
