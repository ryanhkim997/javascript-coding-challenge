import React, { useEffect, useState } from 'react';

import '../styles/App.css';
import Search from './Search.js';
import UserList from './UserList.js';

const App = () => {
  const [data, setData] = useState(null);
  const [firstUser, setUser] = useState(null); //make sure to use something more robust here instead of the first user

  const callAPI = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .catch(err => console.error(err))
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await callAPI();
        console.log(response);
        setData(response);
        setUser(response[0].name);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [ firstUser ]);

  return (
    <div className="App">
      <header className="App-header">
        Itinerary
      </header>
      <Search users={data}/>
      <UserList users={data}/>
    </div>
  );
};

export default App;
