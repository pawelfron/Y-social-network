import React from 'react'
import UserCard from './UserCard'

const UserList = () => {
  const users = [
    {name: "Adam", nickname: "adam99", profileFoto: ''},
    {name: "Basia", nickname: "basiaaa", profileFoto: ''},
    {name: "Wojtek", nickname: "wojtas", profileFoto: ''}
  ]
    
  return (
    <>
      {users.map(user => (
        <UserCard key={user.nickname} {...user} />
      ))}
    </>
  );
  
}

export default UserList