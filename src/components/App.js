import React, { useEffect, useState } from 'react';

import UserList from './UserList.js';
import Search from './Search.js';
import '../styles/App.css';

const App = () => {
  const [ users, setUsers] = useState([]);
  const [ renderedUsers, setRenderedUsers ] = useState([]); // Duplicate state to accommodate for search functionality
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ loading, setLoading ] = useState(true);

  /*
  * Gets all users
  */
  const getUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .catch(error => console.log(error))
  };
  
  /*
  * Handles search using filter() array method (case-agnostic)
  */
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
    <div className="App">
      {loading
      ? <div className="loadSign">Loading Users...</div>
      : <div>
        <header className="App-header">
          Home
        </header>
        <Search
          users={users}
          searchTerm={searchTerm}
          setRenderedUsers={setRenderedUsers}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        <UserList users={renderedUsers}/>
      </div>
      }      
    </div>

  );
};

export default App;