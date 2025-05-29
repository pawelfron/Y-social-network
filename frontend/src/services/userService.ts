import { FollowManageData, UserEditData, UserSummary, userWithDate } from '../interfaces/user';
import { axiosInstance } from './apiClient';

export const UserService = {
  async searchUsers(query: string): Promise<UserSummary[]> {
    const res = await axiosInstance.get(`/users?search=${query}`);
    return res.data;
  },

  async getUser(id: number): Promise<UserSummary> {
    const res = await axiosInstance.get(`/users/${id}`);
    return res.data;
  },

  async editUser(id: number, data: UserEditData): Promise<UserEditData> {
    const res = await axiosInstance.put(`/users/${id}/edit`, data);
    return res.data;
  },

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
