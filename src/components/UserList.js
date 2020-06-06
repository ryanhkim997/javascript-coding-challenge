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
//   return (
//     !users ?
//       <div>No results</div> : 
//       users.map((user, key) => (
//         <User user={user} key={key}/>
//       ))
//   )
}

export default UserList;