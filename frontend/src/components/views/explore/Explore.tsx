import React from 'react'
import SearchBar from '../../SearchBar/SearchBar.tsx'
import Post from '../../Post/Post.tsx'

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