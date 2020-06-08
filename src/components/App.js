import React, { useEffect, useState } from 'react';

import UserList from './UserList.js';
import Search from './Search.js';
import { fetchWithTimeout, requestErrorHandler } from '../extra_methods.js';
import '../styles/App.css';

const App = () => {
  const [ users, setUsers] = useState([]);
  const [ renderedUsers, setRenderedUsers ] = useState([]); // Duplicate state to accommodate for search functionality
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  /*
  * Gets all users
  */
  const getUsers = () => {
    const url = `https://jsonplaceholder.typicode.com/users`;

    return fetchWithTimeout(url, 15000)
      .then(res => res.json())
      .catch(error => {
        requestErrorHandler(error);
        setLoading(false);
        setError(error.message);
      })
  };
  
  /*
  * Handles search using filter() array method (case-agnostic)
  */
  const handleSearch = (term) => {
    const caselessTerm = term.toLowerCase();
    const filteredUsers = users.filter(({ name }) => name.toLowerCase().includes(caselessTerm))
    setRenderedUsers(filteredUsers); // Case where no users match is handled in UserList component
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

  if (error) {
    return (
      <div className="errorPage">
        <div className="errorMsg">{`${error} 😞`}</div>
      </div>
    );
  }
  return (
    <div className="App">
      {loading
      ? <div className="loadSign">Loading Users...</div>
      : <div className="App-container">
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