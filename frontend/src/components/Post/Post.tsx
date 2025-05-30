import React, { useEffect, useState } from 'react';
import {
  MessageCircle, Repeat, Heart, HeartIcon, BarChart2,
  Share, BadgeCheck, Pencil, Trash2
} from 'lucide-react';
import './Post.css';
import { PostDetails } from '../../interfaces/post';
import { Comment, CommentCreateData, CommentWithID } from '../../interfaces/comment';
import { PostService } from '../../services/postService';
import { CommentsService } from '../../services/commentsService';

interface PostProps {
  post: PostDetails;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(
    Array.isArray(post.likes) && post.author?.id
      ? post.likes.includes(post.author.id)
      : false
  );
  const [likes, setLikes] = useState(post.likes_count);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  useEffect(() => {
    if (showComments) {
      CommentsService.getPostComments(post.id).then(setComments);
    }
  }, [showComments]);

  const toggleLike = async () => {
    try {
      if (liked) {
        await PostService.unlikePost(post.id);
        setLikes(prev => prev - 1);
      } else {
        await PostService.likePost(post.id);
        setLikes(prev => prev + 1);
      }
      setLiked(!liked);
    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const newCommentData: CommentCreateData = {
      post: post.id,
      content: commentText,
    };
    try {
      await CommentsService.addComment(newCommentData);
      CommentsService.getPostComments(post.id).then(setComments);
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleEditPost = async () => {
    try {
      await PostService.updatePost(post.id, { content: editedContent });
      post.content = editedContent; // update local display
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to edit post", err);
    }
  };

  return (
    <div className="post">
      <div className="postHeader">
        <img
          src={post.author.profile_photo || "../../assets/default-avatar.jpg"}
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
        {post.is_own_post && (
          <div className="editActions">
            <Pencil size={16} onClick={() => setIsEditing(!isEditing)} className="clickableIcon" />
            {/* Można też dodać Trash2 do usuwania */}
          </div>
        )}
      </div>

      <div className="postContent">
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="editTextarea"
            />
            <button onClick={handleEditPost}>Save</button>
          </>
        ) : (
          <p className="postText">{post.content}</p>
        )}
        {post.image && <img src={post.image} alt="Post" className="postImage" />}
      </div>

      <div className="postActions">
        <div className="action" onClick={() => setShowComments(!showComments)}>
          <MessageCircle size={16} /> {comments.length}
        </div>
        <div className="action"><Repeat size={16} /> 0</div>
        <div className={`action likeAction ${liked ? 'liked' : ''}`} onClick={toggleLike}>
          {liked ? <HeartIcon fill="currentColor" size={16} /> : <Heart size={16} />}
          {likes}
        </div>
        <div className="action"><BarChart2 size={16} /> 0</div>
        <div className="action"><Share size={16} /></div>
      </div>

      {showComments && (
        <div className="commentsSection">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <strong>@{comment.author.username}:</strong> {comment.content}
            </div>
          ))}
          <div className="addComment">
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button onClick={handleAddComment}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
