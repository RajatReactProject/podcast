import React from 'react'
import Buttons from '../../Buttons'

function EpisodeDetails({title,description,audioFile,onClick,index}) {
  return (
    <div>
        <h1>{index}.{title}</h1>
        <p>{description}</p>
        <Buttons text = {"Play"} onClick={() => onClick(audioFile)}/>
    </div>
  )
}

export default EpisodeDetails