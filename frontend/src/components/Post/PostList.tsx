import React from 'react';
import { PostDetails } from "../../interfaces/post";
import Post from "./Post";
import { AuthService } from '../../services/authService';

interface PostListProps {
  posts: PostDetails[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    const authService = AuthService.get_instance();
    const currentUserId = authService.getUserId();
    const processedPosts = posts.map(post => ({
        ...post,
        is_own_post: post.author?.id === currentUserId,
        }));
  return (
    <div className="postList">
      {processedPosts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
