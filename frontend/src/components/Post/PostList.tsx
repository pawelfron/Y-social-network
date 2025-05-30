import React from 'react';
import { PostSummary } from "../../interfaces/post";
import Post from "./Post";

interface PostListProps {
  posts: PostSummary[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="postList">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
