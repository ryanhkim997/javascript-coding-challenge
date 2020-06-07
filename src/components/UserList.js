import React from 'react';

import User from './User.js';
import '../styles/UserList.css';

const UserList = ({ users }) => {
  return (
    <div className="UserList">
      {!users.length
      ? <div className="emptySearch">No results</div>
      : users.map((user, key) => (
          <User user={user} key={key}/>
        ))
      }
    </div>

  );
}

export default UserList;