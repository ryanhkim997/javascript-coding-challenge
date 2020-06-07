import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Photo from './Photo.js';
import Paginate from './Paginate.js';
import '../styles/PhotoList.css';

const PhotoList = (props) => {
  const { name, userId } = props.location.state;
  const [ photos, setPhotos ] = useState([]);
  const [ albums, setAlbums ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ currentPage, setCurrentPage ] = useState(1);
  
  /*
  * Gets all albums under a given userId
  */
  const getAlbums = (id) => {
    console.log('getAlbums called!')
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
      .then(res => res.json())
      .catch(error => console.log(error))
  };

  /*
  * Gets all photos under a given albumId and merges all photos into one array
  */
  const getPhotos = async (albums) => {
    console.log('getPhotos called!')
    const promises = albums.map(({ id }) => {
      return fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
        .then(res => res.json())
        .catch(error => console.log(error))
    })
    return Promise.all(promises)
      .then(photos => photos.reduce((acc, cV) => acc.concat(cV)))
      .catch(error => console.log(error))
  }

  /*
  * By placing userId in the dependency array, a warning that was previously there is gone but the API calls are made twice each.
  */
  useEffect(() => {
    const getAllPhotos = async () => {
      try {
        const albumList = await getAlbums(userId);
        const flattenedPhotos = await getPhotos(albumList);
        setAlbums(albumList);
        setPhotos(flattenedPhotos);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    getAllPhotos();
  }, [ userId ])
  

  return (
    <div>
      {loading 
      ? <div>Loading Photos...</div>
      : <div>
          <Link to="/">Return to previous page</Link>
          <br/>
          <header>

          {`${name}'s Photos`}
          </header>
          {!photos
            ? null
            // Shows 18 photos per page (ex. first page would span from indices [0, 18) of the photos array)
            : photos.slice((currentPage - 1) * 18, currentPage * 18).map((photo, key) => {
                const albumName = albums.filter(({ id }) => photo.albumId === id)[0].title;
                return (
                  <Photo photo={photo} albumName={albumName} key={key}/>
                );
            })
          }
          <Paginate 
            currentPage={currentPage}
            photos={photos}
            setCurrentPage={setCurrentPage}
          />
      </div>  
      }    
    </div>

  );
}

export default PhotoList;