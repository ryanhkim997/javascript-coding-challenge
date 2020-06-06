import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import Search from './Search.js';
import UserList from './UserList.js';

const App = () => {
  const [data, setData] = useState(null);
  const callAPI = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .catch(err => console.error(err))
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await callAPI();
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [ data ]);

  return (
    <div className="App">
      <header className="App-header">
        <p>{JSON.stringify(data)}</p>
      </header>
      <Search />
      <UserList users={data}/>
    </div>
  );
};

export default App;
