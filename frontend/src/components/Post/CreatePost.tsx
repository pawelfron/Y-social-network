import React, { useState, useRef, useEffect } from 'react';
import { Image, Smile, CalendarClock, MapPin, CircleOff, AlignLeft, X, Globe2, UserCheck, BadgeCheck, AtSign } from 'lucide-react';
// @ts-ignore
import EmojiPicker, { Theme } from 'emoji-picker-react';
import './CreatePost.css';
import { PostService } from '../../services/postService';
import profileAvatar from "../../assets/default-avatar.jpg";


interface Post {
  id: number;
  text: string;
  images: string[];
  replySetting: string;
}

const CreatePost = () => {
  const [text, setText] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReplyOptions, setShowReplyOptions] = useState(false);
  const [replySetting, setReplySetting] = useState('Everyone');
  const emojiRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedText = localStorage.getItem('draft_text');
    if (savedText) setText(savedText);
  }, []);

  useEffect(() => {
    localStorage.setItem('draft_text', text);
  }, [text]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
      if (replyRef.current && !replyRef.current.contains(e.target as Node)) {
        setShowReplyOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length + images.length > 4) {
      alert('You can upload up to 4 images.');
      return;
    }
    setImages(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
  if (!text.trim() && images.length === 0) return;

  try {
    await PostService.createPost({
      content: text,
      image: images[0]// tylko jeden obrazek obsługiwany przez backend
    });


    // Resetuj formularz
    setText('');
    setImages([]);
    setPreviewUrls([]);
    localStorage.removeItem('draft_text');
    setIsExpanded(false);
    setReplySetting('Everyone');
  } catch (error: any) {
    console.error('Błąd podczas wysyłania posta:', error.message || error);
    alert('Nie udało się dodać posta.');
  }
};

  return (
    <div className="createPostContainer">
      <div className="createPostWrapper">
        <div className="inputSection">
          <img src={profileAvatar} alt="avatar" className="userAvatar" />
          <textarea
            ref={textareaRef}
            placeholder="What's happening?"
            value={text}
            onFocus={() => setIsExpanded(true)}
            onChange={(e) => setText(e.target.value)}
            rows={isExpanded ? 3 : 1}
            className={isExpanded ? 'expandedTextarea' : 'collapsedTextarea'}
          />
        </div>

        {isExpanded && (
          <>
            {/* Who can reply */}
            <div className="replySettingWrapper">
              <button className="replyButton" onClick={() => setShowReplyOptions(prev => !prev)}>
                <Globe2 size={14} /> {replySetting} can reply
              </button>

              {showReplyOptions && (
                <div className="replyOptions" ref={replyRef}>
                  <div className="optionItem" onClick={() => { setReplySetting('Everyone'); setShowReplyOptions(false); }}>
                    <Globe2 size={18} /> Everyone
                  </div>
                  <div className="optionItem" onClick={() => { setReplySetting('Accounts you follow'); setShowReplyOptions(false); }}>
                    <UserCheck size={18} /> Accounts you follow
                  </div>
                  <div className="optionItem" onClick={() => { setReplySetting('Verified accounts'); setShowReplyOptions(false); }}>
                    <BadgeCheck size={18} /> Verified accounts
                  </div>
                  <div className="optionItem" onClick={() => { setReplySetting('Only accounts you mention'); setShowReplyOptions(false); }}>
                    <AtSign size={18} /> Only accounts you mention
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Images */}
        {previewUrls.length > 0 && (
          <div className={`imagePreviewGrid count-${previewUrls.length}`}>
            {previewUrls.map((url, index) => (
              <div key={index} className="previewItem">
                <img src={url} alt="preview" />
                <button className="removePreview" onClick={() => handleRemoveImage(index)}>
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Bottom icons and post button */}
        <div className="createPostActions">
          <div className="icons">
            <label>
              <Image size={18} />
              <input type="file" accept="image/*" multiple onChange={handleImageChange} hidden />
            </label>
            <div onClick={() => setShowEmojiPicker(prev => !prev)}>
              <Smile size={18} />
            </div>
            <CircleOff size={18} />
            <AlignLeft size={18} />
            <CalendarClock size={18} />
            <MapPin size={18} />
          </div>
          <button className="postButton" disabled={!text.trim() && images.length === 0} onClick={handlePost}>
            Post
          </button>
        </div>

        {/* Emoji picker */}
        {showEmojiPicker && (
          <div ref={emojiRef} className="emojiPickerContainer">
            <EmojiPicker
              onEmojiClick={(emojiData: any) => setText(prev => prev + emojiData.emoji)}
              theme={Theme.DARK}
              height={350}
              width={300}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
