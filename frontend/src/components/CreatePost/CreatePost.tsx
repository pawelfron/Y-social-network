import React, { useState } from 'react';
import './CreatePost.css';
import { Image, Smile, CalendarClock, MapPin, CircleOff, AlignLeft } from 'lucide-react';

const CreatePost = () => {
  const [text, setText] = useState('');

  return (
    <div className="createPostWrapper">
      <div className="inputSection">
        <img src="https://via.placeholder.com/40" alt="avatar" className="userAvatar" />
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
      </div>
      <div className="createPostActions">
        <div className="icons">
          <Image size={18} />
          {/* <Gif size={18} /> */}
          <CircleOff size={18} />
          <AlignLeft size={18} />
          <Smile size={18} />
          <CalendarClock size={18} />
          <MapPin size={18} />
        </div>
        <button className="postButton" disabled={!text.trim()}>Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
