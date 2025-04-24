import React, { Fragment } from 'react'
import SearchBar from '../components/SearchBar'
import UserList from '../components/UserList'

const RightMenu = () => {

  return (
    <Fragment>
        <SearchBar></SearchBar>
        <UserList></UserList>
    </Fragment>
  )
}

export default RightMenu