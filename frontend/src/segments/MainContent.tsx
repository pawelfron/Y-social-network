import React from 'react';
import CreatePost from '../components/CreatePost/CreatePost';
import Post from '../components/Post/Post';
import './MainContent.css';
import Tabs from '../components/Tabs/Tabs';

const MainContent = () => {
  return (
    <div className="mainContentWrapper">
      <Tabs/>
      <CreatePost />
      <div className="postsFeed">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default MainContent;
