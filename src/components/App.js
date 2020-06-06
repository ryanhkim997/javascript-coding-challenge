import React, { useEffect, useState } from 'react';

import '../styles/App.css';
import Search from './Search.js';
import UserList from './UserList.js';

const App = () => {
  const [data, setData] = useState(null);

  const callAPI = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .catch(error => console.log(error))
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await callAPI();
        console.log(response);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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
