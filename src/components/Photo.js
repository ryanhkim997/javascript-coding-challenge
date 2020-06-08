import React from 'react';

import '../styles/Photo.css';

const Photo = ({ photo, albumName }) => {
  return (
    <div className="Photo">
      <img className="userPhotos" src={photo.url} alt=""/>
      <div className="caption">
        <div id="photoTitle">{photo.title}</div>
        <div id="albumName">{albumName}</div>
      </div>
    </div>
  );
}

export default Photo;