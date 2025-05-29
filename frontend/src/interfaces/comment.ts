import { UserSummary } from './user'

export interface Comment {
  id: number;
  post: number;
  content: string;
  created_at: string;
  updated_at: string;
  author: UserSummary;
}

export interface CommentCreateData {
  post: number;
  content: string;
}
