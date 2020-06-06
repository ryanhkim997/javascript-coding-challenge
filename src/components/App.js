import React, { useEffect, useState } from 'react';

import '../styles/App.css';
// import Search from './Search.js';
import UserList from './UserList.js';

const App = () => {
  const [ users, setUsers] = useState([]);
  const [ renderedUsers, setRenderedUsers ] = useState([]); //duplicate state, could find a way around this
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ loading, setLoading ] = useState(true);

  //gets all users and stores them in users
  const getUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .catch(error => console.log(error))
  };
  
  //handles search (case-agnostic)
  const handleSearch = (term) => {
    const caselessTerm = term.toLowerCase();
    const filteredUsers = users.filter(({ name }) => name.toLowerCase().includes(caselessTerm))
    setRenderedUsers(filteredUsers); //case where no users match is handled in UserList component
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
        setRenderedUsers(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    loading
    ? <div>Loading Users...</div>
    : <div className="App">
      <header className="App-header">
        Itinerary
      </header>
      <form id="searchBar" onSubmit={(e) => {
        handleSearch(searchTerm);
        e.preventDefault();
      }}>
        <label>
          Search User
          <input type="text" onChange={(e) => setSearchTerm(e.target.value)}/>
        </label>
          <input type="submit" value="Search"/>
          <input type="button" value="Cancel" onClick={() => {
            setRenderedUsers(users);
            document.getElementById('searchBar').reset();
          }}/>
      </form>
      <UserList users={renderedUsers}/>
    </div>
  );
};

export default App;
