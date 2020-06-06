import React from 'react';

import '../styles/Photo.css';

const Photo = ({ photo }) => {
  return (
    <div>
      {photo.title}
      <img className="userPhotos" src={photo.url} alt=""/>
    </div>
  );
}

export default Photo;