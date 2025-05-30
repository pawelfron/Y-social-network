import React, { useState } from 'react';
import './Post.css';
import { MessageCircle, Repeat, Heart, HeartIcon, BarChart2, Share } from 'lucide-react';
import { PostSummary } from '../../interfaces/post';

interface PostProps {
  post: PostSummary;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes_count);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => prev + (liked ? -1 : 1));
  };

  return (
    <div className="postWrapper">
      <div className="postHeader">
        <img
          src={post.author.profile_photo || 'https://via.placeholder.com/40'}
          alt="avatar"
          className="userAvatar"
        />
        <div className="userInfo">
          <span className="userName">{post.author.username}</span>
          <span className="userHandle">@{post.author.username} · {post.created_at}</span>
        </div>
      </div>
      <div className="postContent">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="postImage" />}
      </div>
      <div className="postActions">
        <div className="action"><MessageCircle size={16} /> 292</div>
        <div className="action"><Repeat size={16} /> 954</div>
        <div className={`action likeAction ${liked ? 'liked' : ''}`} onClick={toggleLike}>
          {liked ? <HeartIcon fill="currentColor" size={16} /> : <Heart size={16} />}
          {likes.toLocaleString()}
        </div>
        <div className="action"><BarChart2 size={16} /> 1M</div>
        <div className="action"><Share size={16} /></div>
      </div>
    </div>
  );
};

export default Post;
