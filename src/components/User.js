import React from 'react';

const User = ({ user }) => {
  return (
    <div>
      {user.name} {user.company.name} {user.company.catchPhrase}
    </div>
  );
}

export default User;