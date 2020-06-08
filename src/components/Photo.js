import React from 'react';

import '../styles/Photo.css';

const Photo = ({ photo, albumName }) => {
  return (
    <div className="Photo">
      <img className="userPhotos" src={photo.url} alt=""/>
      <div className="caption">
        <h4 id="photoTitle">{photo.title}</h4>
        <div id="albumName">{albumName}</div>
      </div>
    </div>
  );
}

export default Photo;