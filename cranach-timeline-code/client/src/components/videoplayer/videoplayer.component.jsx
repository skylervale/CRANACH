import React from 'react';
import ReactPlayer from 'react-player/youtube';
import './videoplayer.style.css';


export const Videoplayer = (props) => {
    return (
      <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url={props.url}
          width='100%'
          height='100%'
        />
      </div>
    );
}
