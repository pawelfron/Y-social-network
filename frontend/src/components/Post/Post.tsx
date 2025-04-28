import React, { useState } from 'react';
import './Post.css';
import { MessageCircle, Repeat, Heart, HeartIcon, BarChart2, Share } from 'lucide-react';
// import postImage from '../assets/post-image.png'; // obrazek posta

const Post = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(696968); // bazowa liczba lajków

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  return (
    <div className="postWrapper">
      <div className="postHeader">
        <img src="https://via.placeholder.com/40" alt="avatar" className="userAvatar" />
        <div className="userInfo">
          <span className="userName">down bad comments <span className="verified">✔</span></span>
          <span className="userHandle">@downbadcomment · 12h</span>
        </div>
      </div>
      <div className="postContent">
        <p>
          <span className="mention">@JohnPaul2</span> rel
        </p>
        <div className="postText">
          seeing dogs be making my day 1000x better
        </div>
        {/* <img src={postImage} alt="Post" className="postImage" /> */}
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
