import { FollowManageData, UserEditData, UserSummary } from '../interfaces/user';
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
    return axiosInstance.post(`/users/${id}/follow`);
  },

  async unfollowUser(id: number): Promise<FollowManageData> {
    return axiosInstance.delete(`/users/${id}/unfollow`);
  },
};
