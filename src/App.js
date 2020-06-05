import React, { useEffect, useState } from 'react';
import './App.css';

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
        console.log(response);
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
    </div>
  );
};

export default App;
