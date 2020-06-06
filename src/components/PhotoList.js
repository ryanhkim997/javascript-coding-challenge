import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Photo from './Photo.js';
import '../styles/PhotoList.css';

const Photos = () => {
  const { userId } = useParams();
  const [ photos, setPhotos ] = useState(null);
  const [ albums, setAlbums ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ photosToShow, setPhotosToShow ] = useState(18);
  const [ firstPhoto, setFirstPhoto ] = useState(null);
  
  const getAlbums = () => {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then(res => res.json())
      .catch(error => console.log(error))
  };

  const getPhotos = async (albums) => {
    let listOfPhotosBasedOnAlbum = [];
    for (let { id } of albums) {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
        .then(res => res.json())
        .then(arr => listOfPhotosBasedOnAlbum = listOfPhotosBasedOnAlbum.concat(arr))
        .catch(error => console.log(error))
    }
    return listOfPhotosBasedOnAlbum;
  }

  useEffect(() => {
    const getAllPhotos = async () => {
      try {
        const albums = await getAlbums();
        const photos = await getPhotos(albums);
        setAlbums(albums);
        setPhotos(photos);
        setFirstPhoto(photos[0].id);
        setLoading(!loading);
      } catch (error) {
        console.log(error)
      }
    }
    getAllPhotos();
  }, [ firstPhoto ])
  

  return (
    loading 
    ? <div>Loading Photos...</div>
    : <div>
        <Link to="/">Return to previous page</Link>
        {!photos
          ? null 
          : photos.slice(0, photosToShow).map((photo, key) => {
            const albumName = albums.filter(({ id }) => photo.albumId === id)[0].title;
            return (
              <Photo photo={photo} albumName={albumName} key={key}/>
            )
          })
        }

        <button onClick={() => setPhotosToShow(photosToShow + 18)}>
          Show More
        </button>
    </div>
  );
}

export default Photos;