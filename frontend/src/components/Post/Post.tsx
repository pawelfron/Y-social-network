import React, { useState } from 'react';
import { MessageCircle, Repeat, Heart, HeartIcon, BarChart2, Share, BadgeCheck } from 'lucide-react';
import './Post.css';
import { PostSummary } from '../../interfaces/post';

interface PostProps {
  post: PostSummary;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false); // Tu możesz podpiąć stan globalny, jeśli masz
  const [likes, setLikes] = useState(post.likes_count);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => prev + (liked ? -1 : 1));
  };

  return (
    <div className="postWrapper">
      <div className="postHeader">
        <img
          src={post.author.profile_photo || "https://via.placeholder.com/40"}
          alt="avatar"
          className="userAvatar"
        />
        <div className="userInfo">
          <span className="userName">
            {post.author.username}
            {post.author.followers_count > 100 && <BadgeCheck size={16} className="verified" />}
          </span>
          <span className="userHandle">
            @{post.author.username} · {new Date(post.created_at).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="postContent">
        <p className="postText">{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="postImage" />}
      </div>

      <div className="postActions">
        <div className="action"><MessageCircle size={16} /> 0</div>
        <div className="action"><Repeat size={16} /> 0</div>
        <div className={`action likeAction ${liked ? 'liked' : ''}`} onClick={toggleLike}>
          {liked ? <HeartIcon fill="currentColor" size={16} /> : <Heart size={16} />}
          {likes}
        </div>
        <div className="action"><BarChart2 size={16} /> 0</div>
        <div className="action"><Share size={16} /></div>
      </div>
    </div>
  );
};

export default Post;
