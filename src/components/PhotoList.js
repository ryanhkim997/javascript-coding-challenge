import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Photo from './Photo.js';
import '../styles/PhotoList.css';

const PhotoList = ({ match }) => {
  const { userId } = useParams();
  const [ photos, setPhotos ] = useState([]);
  const [ albums, setAlbums ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ currentPage, setCurrentPage ] = useState(1);
  
  //gets all albums under a given userId
  const getAlbums = () => {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then(res => res.json())
      .catch(error => console.log(error))
  };

  //gets all photos under a given albumId and merges all photos into one array
  const getPhotos = async (albums) => {
    let listOfPhotosBasedOnAlbum = [];
    
    for (let { id } of albums) {
      const partialPhotos = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
        .then(res => res.json())
        .catch(error => console.log(error))
      listOfPhotosBasedOnAlbum = listOfPhotosBasedOnAlbum.concat(partialPhotos); //this particular line is very inefficient
    }
    return listOfPhotosBasedOnAlbum;
  }

  //useEffect has a "missing dependency" warning because the component relies on the userId from useParams() hook
  useEffect(() => {
    const getAllPhotos = async () => {
      try {
        const albumList = await getAlbums();
        const flattenedPhotos = await getPhotos(albumList);
        setAlbums(albumList);
        setPhotos(flattenedPhotos);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    getAllPhotos();
  }, [])
  

  return (
    loading 
    ? <div>Loading Photos...</div>
    : <div>
        <Link to="/">Return to previous page</Link>
        {!photos
          ? null
          //shows 18 photos per page (ex. first page would span from indices [0, 18) where the upper bound is exclusive)
          : photos.slice((currentPage - 1) * 18, currentPage * 18).map((photo, key) => {
              const albumName = albums.filter(({ id }) => photo.albumId === id)[0].title;
              return (
                <Photo photo={photo} albumName={albumName} key={key}/>
              )
          })
        }
        {/* These two buttons add pagination functionality, where currentPage represents the current page. */}
        <button onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}>
          Previous
        </button>
        <span>Current Page: {currentPage}</span>
        <button onClick={() => {
          if (currentPage * 18 < photos.length) {
            setCurrentPage(currentPage + 1);
          }
        }}>
          Next
        </button>
    </div>
  );
}

export default PhotoList;