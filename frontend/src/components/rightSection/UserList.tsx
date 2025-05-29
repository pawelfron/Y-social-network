import React from 'react'
import UserCard from './UserCard.tsx'
import './UserList.css'
import { UserSummary } from '../../interfaces/user.ts';

interface UserListProps {
  users: UserSummary[];
}

const UserList: React.FC<UserListProps> = ({users}) => {
    
  return (
    <div className='ListWrapper'>
      {users.map(user => (
        <UserCard key={user.username} {...user} />
      ))}
    </div>
  );
  
}

export default UserList