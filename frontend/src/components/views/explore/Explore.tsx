import { useState } from 'react'
import SearchBar from '../../SearchBar/SearchBar.tsx'
import { PostDetails } from '../../../interfaces/post.ts';
import { PostService } from '../../../services/postService.ts';
import PostList from '../../Post/PostList.tsx';

const Explore = () => {
  const [posts, setPosts] = useState<PostDetails[]>([]);

  const onSearch = async (query: string) => {
      try {
        const results = await PostService.searchPosts(false, query);
        setPosts(results);
      } catch (err) {
        console.error("Search failed", err);
        setPosts([]);
      }
    };
  
  return (
    <>
        <div className='title'> Explore </div>
        <SearchBar onSearch={onSearch}/>
        <PostList posts={posts}></PostList>

    </>


  )
}

export default Explore