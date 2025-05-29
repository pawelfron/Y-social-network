import React from 'react'
import UserCard from './UserCard.tsx'
import './UserList.css'

const UserList = () => {
  const users = [
    {name: "Adam", nickname: "adam99", profileFoto: ''},
    {name: "Basia", nickname: "basiaaa", profileFoto: ''},
    {name: "Wojtek", nickname: "wojtas", profileFoto: ''}
  ]
    
  return (
    <div className='ListWrapper'>
      {users.map(user => (
        <UserCard key={user.nickname} {...user} />
      ))}
      <button className='showMoreButton'>Show more...</button>
    </div>
  );
  
}

export default UserList