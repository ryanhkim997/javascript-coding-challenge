import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Photo from './Photo.js';
import '../styles/PhotoList.css';

const Photos = () => {
  const { userId } = useParams();
  const [ photos, setPhotos ] = useState(null);
  const [ firstPhoto, setFirstPhoto ] = useState(null);
  
  const getAlbums = () => {
    console.log(userId);
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then(res => res.json())
      .catch(error => console.log(error))
  };

  const getPhotos = async (albums) => {
    let listOfPhotosBasedOnAlbum = [];
    for (let { id } of albums) {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
        .then(res => res.json())
        .then(arr => listOfPhotosBasedOnAlbum.push(arr))
        .catch(error => console.log(error))
    }
    return listOfPhotosBasedOnAlbum;
  }

  useEffect(() => {
    const getAllPhotos = async () => {
      try {
        const albums = await getAlbums();
        const photos = await getPhotos(albums);
        setPhotos(photos);
        setFirstPhoto(photos[0][0].id)
      } catch (error) {
        console.log(error)
      }
    }
    getAllPhotos();
  }, [ firstPhoto ])
  

  return (
    <div>
      <Link to="/">Return to previous page</Link>
      {
        !photos ? 
        null :
        photos.map((photo, key) => (
          photo.map((indiv, index) => (
            <Photo photo={indiv} key={index}/>
          ))
        )) 
      }
    </div>
  );
}

export default Photos;