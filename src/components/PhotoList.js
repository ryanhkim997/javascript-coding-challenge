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
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
      .then(res => res.json())
      .catch(error => console.log(error))
  };

  /*
  * Gets all photos under a given albumId and merges all photos into one array
  */
  const getPhotos = async (albums) => {
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
  * 1. API call for list of album ID's and titles given 
  * 2. API call for list of photos given album ID's, yielding a nested array of arrays (resolved Promises)
  * 3. These arrays are reduced into one array, which is set as photos.
  * 4. Loading state is set to false and the photos are rendered.
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
    <div className="PhotoList">
      {loading 
      ? <div className="loadSign">Loading Photos...</div>
      : <div className="photosContainer">
          <header className="PhotoList-header">
            <Link  to="/">Return to previous page</Link>            
          </header>
          <h1>{`${name}'s Photos`}</h1>
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