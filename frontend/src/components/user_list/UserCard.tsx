import React, { Fragment } from 'react'
import './UserCard.css'
import defaultProfile from '../../assets/default-avatar.jpg'

interface Props {
    name: string;
    nickname: string;
    profileFoto?: string;
}

const UserCard = (props: Props) => {


  return (
    <div className='cardWrapper'>
        <img src={props.profileFoto || defaultProfile} alt="" />
        <div className='namesWrapper'>
            <div>{props.name}</div>
            <div>{'@' + props.nickname}</div>
        </div>
        <button>Follow</button>
    </div>
  )

}



export default UserCard