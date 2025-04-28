import React from 'react'
import SearchBar from '../components/search_bar/SearchBar'
import Post from '../components/Post/Post'

const Explore = () => {
  return (
    <>
        <div className='title'> Explore </div>
        <SearchBar />
        <Post />
        <Post />
        <Post />
    </>


  )
}

export default Explore