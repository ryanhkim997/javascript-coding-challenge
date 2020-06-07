import React from 'react';
import User from './User.js';

const UserList = ({ users }) => {
  return (
    !users.length
    ? <div>No results</div>
    : users.map((user, key) => (
        <User user={user} key={key}/>
      ))
  );
}

export default UserList;