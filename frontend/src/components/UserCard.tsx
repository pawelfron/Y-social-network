import React, { Fragment } from 'react'

interface Props {
    name: string;
    nickname: string;
    profileFoto?: string;
}

const UserCard = (props: Props) => {

  return (
    <div>
        <img src="" alt="" />
        <div>
            <div>{props.name}</div>
            <div>{'@' + props.nickname}</div>
        </div>
        <button>Follow</button>
    </div>
  )

}



export default UserCard