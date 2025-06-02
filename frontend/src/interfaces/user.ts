export interface UserSummary {
  id: number;
  username: string;
  profile_photo?: string; 
  followers_count: number;
  following_count: number;
}

export interface UserDetails extends UserSummary {
  first_name: string;
  last_name: string;
  email: string;
  profile_description: string;
  date_joined: Date;
  is_following: boolean;
}

export interface UserEditData {
  username: string;
  first_name?: string;
  last_name?: string;
  profile_photo?: File;
  profile_description?: string;
}

export interface FollowManageData {
  details: string;
}

export interface userWithDate {
  user: UserSummary
  created_at: Date
}
