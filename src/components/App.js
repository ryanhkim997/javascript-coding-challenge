import React, { useEffect, useState } from 'react';

import '../styles/App.css';
import Search from './Search.js';
import UserList from './UserList.js';

const App = () => {
  const [users, setUsers] = useState([]);

  //gets all users and stores them in users
  const callAPI = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .catch(error => console.log(error))
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await callAPI();
        setUsers(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Itinerary
      </header>
      <Search users={users}/>
      <UserList users={users}/>
    </div>
  );
};

export default App;
