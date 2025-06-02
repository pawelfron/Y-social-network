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
import { AuthService } from '../../services/authService';
import profileAvatar from "../../assets/default-avatar.jpg";
import { usePosts } from '../../contexts/PostsListContext';
import { useUser } from '../../contexts/UserContext';


interface PostProps {
  post: PostDetails;
}

const Post: React.FC<PostProps> = ({ post }) => {
  
  const [liked, setLiked] = useState(false);

  const [likes, setLikes] = useState(post.likes_count);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');

  const {refreshPosts} = usePosts();
  const {user, loading} = useUser();

  useEffect(() => {

    if (loading) return;
    if (Array.isArray(post.likes) && user!.id) {
      setLiked(post.likes.includes(user!.id));
    }
    
    console.log(`is liked: ${liked}`)

}, [post.likes_count, user, loading]);


useEffect(() => {
  CommentsService.getPostComments(post.id).then(setComments);
}, [post.id]);


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
      setCommentText('');
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

  const handleDeletePost = async () => {
  try {
    await PostService.deletePost(post.id);
    refreshPosts();
  } catch (err) {
    console.error("Failed to delete post", err);
  }
};

  const handleEditComment = async (id: number) => {
    try {
      await CommentsService.editComment(id, { content: editedCommentContent });
      setEditingCommentId(null);
      CommentsService.getPostComments(post.id).then(setComments);
    } catch (err) {
      console.error("Failed to edit comment", err);
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await CommentsService.deleteComment(id);
      setComments(prev => prev.filter(comment => comment.id !== id));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div className="post">
      <div className="postHeader">
        <img
          src={'http://localhost:8000' + post.author.profile_photo || profileAvatar}
          alt="avatar"
          className="userAvatar"
        />
        <div className="userInfo">
          <span className="userName">
            {post.author.username}
            {post.author.followers_count > 100 && (
              <BadgeCheck size={16} className="verified" />
            )}
          </span>
          <span className="userHandle">
            @{post.author.username} · {new Date(post.created_at).toLocaleString()}
          </span>
        </div>
        {post.is_own_post && (
          <div className="editActions">
            <Pencil
              size={16}
              onClick={() => setIsEditing(!isEditing)}
              className="clickableIcon"
            />
            <Trash2
              size={16}
              onClick={handleDeletePost}
              className="clickableIcon"
            />
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
            <div className="editPostButtons">
              <button onClick={handleEditPost} className="saveBtn">Save</button>
              <button onClick={() => setIsEditing(false)} className="cancelBtn">Cancel</button>
            </div>
          </>
        ) : (
          <p className="postText">{post.content}</p>
        )}
        {post.image && (
          <img src={'http://localhost:8000/' + post.image} alt="Post" className="postImage" />
        )}
      </div>

      <div className="postActions">
        <div className="action" onClick={() => setShowComments(!showComments)}>
          <MessageCircle size={16} />
          {comments.length}
        </div>
        <div className="action"><Repeat size={16} /> 0</div>
        <div
          className={`action likeAction ${liked ? "liked" : ""}`}
          onClick={toggleLike}
        >
          {liked ? (
            <HeartIcon fill="currentColor" size={16} />
          ) : (
            <Heart size={16} />
          )}
          {likes}
        </div>
        <div className="action"><BarChart2 size={16} /> 0</div>
        <div className="action"><Share size={16} /></div>
      </div>

      {showComments && (
        <div className="commentsSection">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <strong>@{comment.author.username}:</strong>
              {editingCommentId === comment.id ? (
                <>
                  <input
                    type="text"
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                    className="editCommentInput"
                  />
                  <div className="commentEditButtons">
                    <button
                      onClick={() => handleEditComment(comment.id)}
                      className="saveBtn"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="cancelBtn"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span> {comment.content}</span>
                  {comment.author.id === user?.id && (
                    <div className="commentActions">
                      <Pencil
                        size={14}
                        className="clickableIcon"
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditedCommentContent(comment.content);
                        }}
                      />
                      <Trash2
                        size={14}
                        className="clickableIcon"
                        onClick={() => handleDeleteComment(comment.id)}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          <div className="addComment">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
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
