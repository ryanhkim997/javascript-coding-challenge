import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/User.css';

const User = ({ user }) => {
  return (
    <div>
      <Link className="User" to={{
        pathname: `/photos/${user.id}`,
        state: {
          name: user.name,
          userId: user.id
        }
      }}>
        <h3 className="userName">{user.name}</h3>
        <div className="company">{user.company.name}</div>
        <div className="catchPhrase">{user.company.catchPhrase}</div>     
      </Link>
    </div>
  );
}

export default User;