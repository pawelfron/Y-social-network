import React, { useEffect, useState } from 'react';
import CreatePost from '../../components/Post/CreatePost.tsx';
import PostList from '../../components/Post/PostList.tsx';
import './MainContent.css';
import Tabs from '../../components/views/explore/Tabs.tsx';
import { PostDetails } from '../../interfaces/post.ts';
import { PostService } from '../../services/postService.ts';
import { usePosts } from '../../contexts/PostsListContext.tsx';

const MainContent = () => {
  const { posts: contextPosts, isLoaded } = usePosts();
  const [posts, setPosts] = useState<PostDetails[]>([]);
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (activeTab === 'forYou') {
          if (!isLoaded) return;
          setPosts(contextPosts); // ← odświeżenie po zmianie danych z kontekstu
        } else {
          const followingPosts = await PostService.searchPosts(true, '');
          setPosts(followingPosts);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [activeTab, contextPosts, isLoaded]);


  const handleTabChange = (tab: 'forYou' | 'following') => {
    setActiveTab(tab);
  };

  return (
    <div className="mainContentWrapper">
      <Tabs onTabChange={handleTabChange} />
      <CreatePost />
      <div className="postsFeed">
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default MainContent;
