import React, { useEffect, useState } from 'react';

import UserList from './UserList.js';
import Search from './Search.js';
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
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .catch(error => {
        /*
        * Handles API call errors
        * 1. First conditional block handles any sort of response code outside of 2xx range
        * 2. Second conditional block handles a client-side request error
        * 3. Else block handles any other errors
        * NOTE: This error handling pattern has been copied over into any other component that makes API calls (PhotoList)
        */
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.message);
        }
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