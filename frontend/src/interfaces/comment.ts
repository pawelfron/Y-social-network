import { UserSummary } from './user'

export interface Comment {
  id: number;
  post: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  author: UserSummary;
}

export interface CommentCreateData {
  post: number;
  content: string;
}

export interface CommentWithID extends CommentCreateData {
    id: number;
}

export interface CommentContent {
    content: string;
}
