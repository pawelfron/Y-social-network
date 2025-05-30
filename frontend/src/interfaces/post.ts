export interface PostAuthor {
  id: number;
  username: string;
  profile_photo: string;
  followers_count: number;
  following_count: number;
}

export interface PostSummary {
  id: number;
  content: string;
  image: string; 
  created_at: string;
  likes_count: number;
  author: PostAuthor;
}

export interface PostDetails extends PostSummary {
  likes: number[];
  is_own_post: boolean;
}

export interface PostCreateData {
  content: string;
  image?: string | File;
}

export interface PostUpdateData {
  content?: string;
  image?: string;
}

export interface PostInfo extends PostCreateData{
    id: number
}
