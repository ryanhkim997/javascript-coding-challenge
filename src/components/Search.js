import React from 'react';

import '../styles/Search.css';

const Search = ({ users, searchTerm, setRenderedUsers, handleSearch, setSearchTerm }) => {
  return (
      <form id="searchBar" onSubmit={(e) => {
      handleSearch(searchTerm);
      e.preventDefault();
      }}>
      <label>
          <input
          type="text"
          placeholder="Search by User's Name"
          onChange={(e) => setSearchTerm(e.target.value)}
          />
      </label>
          <input className="submit-search" type="submit" value="Search"/>
          <input className="cancel-search" type="button" value="Cancel" onClick={() => {
          setRenderedUsers(users); // Changes rendered users back to original users from the API call on page load
          document.getElementById('searchBar').reset();
          }}/>
      </form>
  );
}

export default Search;