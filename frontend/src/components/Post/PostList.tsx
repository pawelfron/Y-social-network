import React, { useEffect, useState } from 'react';
import { PostSummary, PostDetails } from '../../interfaces/post';
import { PostService } from '../../services/postService';
import Post from './Post';

interface PostListProps {
  context: 'home' | 'profile';
  userId?: number;
}

const PostList: React.FC<PostListProps> = ({ context, userId }) => {
  const [posts, setPosts] = useState<PostDetails[] | PostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let fetchedPosts: PostSummary[] | PostDetails[] = [];
        if (context === 'home') {
          // Możesz też dodać opcjonalnie `onlyFollowed` jako prop
          fetchedPosts = await PostService.searchPosts(false, '');
        } else if (context === 'profile' && userId) {
          fetchedPosts = await PostService.getUserPosts(userId);
        } else {
          fetchedPosts = [];
        }

        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Błąd podczas pobierania postów:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [context, userId]);

  if (loading) return <p>Ładowanie postów...</p>;
  if (posts.length === 0) return <p>Brak postów do wyświetlenia.</p>;

  return (
    <div className="postListContainer">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
