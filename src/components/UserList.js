import React from 'react';
import User from './User.js';

const UserList = ({ users }) => {
  if (users) {
    return users.map((user, key) => (
      <User user={user} key={key}/>
    ))    
  } else {
    return (
      <div>No Results</div>
    );
  }

}

export default UserList;