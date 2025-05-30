import React from 'react';
import CreatePost from '../../components/Post/CreatePost.tsx';
import Post from '../../components/Post/Post.tsx';
import './MainContent.css';
import Tabs from '../../components/views/explore/Tabs.tsx';

const MainContent = () => {
  return (
    <div className="mainContentWrapper">
      <Tabs/>
      <CreatePost />
      <div className="postsFeed">
        {/* <Post />
        <Post />
        <Post /> */}
      </div>
    </div>
  );
};

export default MainContent;
