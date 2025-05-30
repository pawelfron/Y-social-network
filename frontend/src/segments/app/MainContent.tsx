import React from 'react';
import CreatePost from '../../components/Post/CreatePost.tsx';
import PostList from '../../components/Post/PostList.tsx'; // ZMIANA
import './MainContent.css';
import Tabs from '../../components/views/explore/Tabs.tsx';

const MainContent = () => {
  return (
    <div className="mainContentWrapper">
      <Tabs />
      <CreatePost />
      <div className="postsFeed">
        <PostList context="home" /> 
      </div>
    </div>
  );
};

export default MainContent;
