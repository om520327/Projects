import { useParams } from 'react-router-dom';
import React from 'react';
import ReactPlayer from 'react-player';
import './Trailler.css';
const Trailler = () => {
  let params = useParams();
  const key = params.ytTrailerId;
  return (
    <div className='react-player-container'>
      {key != null ? (
        <ReactPlayer
          controls='true'
          playing={true}
          url={`https://www.youtube.com/watch?v=${key}`}
          width='100%'
          height='100%'
        />
      ) : null}
    </div>
  );
};

export default Trailler;
