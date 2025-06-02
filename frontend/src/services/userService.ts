import { FollowManageData, UserDetails, UserEditData, UserSummary, userWithDate } from '../interfaces/user';
import { axiosInstance } from './apiClient';

export const UserService = {
  async searchUsers(query: string): Promise<UserSummary[]> {
    const res = await axiosInstance.get(`/users?search=${query}`);
    return res.data;
  },

  async getUser(id: number): Promise<UserDetails> {
    const res = await axiosInstance.get(`/users/${id}`);
    return res.data;
  },

  async editUser(id: number, data: UserEditData): Promise<UserEditData> {
  console.log("Sending edit request:", { id, data });

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "profile_photo"){
        formData.append(key, value as File);
      } else {
        formData.append(key, value as string);
      }
      
    }
  });

  const res = await axiosInstance.put(`/users/${id}/edit`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
}
,

  async followUser(id: number): Promise<FollowManageData> {
    const res = await axiosInstance.post(`/users/${id}/follow`);
    return res.data;
  },

  async unfollowUser(id: number): Promise<FollowManageData> {
    const res = await axiosInstance.delete(`/users/${id}/unfollow`);
    return res.data
  },

  async getFollowers(id: number): Promise<userWithDate[]>{
    const res = await axiosInstance.get(`/users/${id}/followers`)
    return res.data
  },

  async getFollowing(id: number): Promise<userWithDate[]>{
    const res = await axiosInstance.get(`/users/${id}/following`)
    return res.data
  }
};
