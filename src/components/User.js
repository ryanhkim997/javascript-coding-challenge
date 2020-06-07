import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <div>
      <Link to={{
        pathname: `/photos/${user.id}`,
        state: {
          name: user.name,
          userId: user.id
        }
      }}>
        {user.name} || {user.company.name} || {user.company.catchPhrase}      
      </Link>
    </div>
  );
}

export default User;