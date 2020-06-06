import React from 'react';

import '../styles/Photo.css';

const Photo = ({ photo, albumName }) => {
  return (
    <div>
      <img className="userPhotos" src={photo.url} alt=""/><br/>
      {photo.title}<br/>
      {/* {photo.id}<br/> */}
      {albumName}
    </div>
  );
}

export default Photo;