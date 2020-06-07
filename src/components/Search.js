import React from 'react';

const Search = ({ users, searchTerm, setRenderedUsers, handleSearch, setSearchTerm }) => {
  return (
    <form id="searchBar" onSubmit={(e) => {
      handleSearch(searchTerm);
      e.preventDefault();
    }}>
      <label>
        Search User
        <input
          type="text" 
          placeholder="Search by User's Name" 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
        <input type="submit" value="Search"/>
        <input type="button" value="Cancel" onClick={() => {
          setRenderedUsers(users); // Changes rendered users back to original users from the API call on page load
          document.getElementById('searchBar').reset();
        }}/>
    </form>
  );
}

export default Search;