import React from 'react';

const UserList = ({ users }) => {
  if (users) {
    return users.map((user, key) => {
        return (
        <div key={key}>
            {user.name} {user.company.name} {user.company.catchPhrase}
        </div>
        )
    })    
  } else {
    return null;
  }

}

export default UserList;