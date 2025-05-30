import { PostCreateData, PostDetails, PostInfo, PostSummary, PostUpdateData } from "../interfaces/post";
import { axiosInstance } from "./apiClient";

export const PostService ={
    
    async searchPosts(onlyFollowed: boolean, searchQuery: string): Promise<PostSummary[]> {
        const res = await axiosInstance.get(`/posts?onlyFollowed=${onlyFollowed}&search=${searchQuery}`);
        return res.data;
    },

    async getUserPosts(userId: number) : Promise<PostDetails[]> {
        console.log(`/posts`);
        const res = await axiosInstance.get(`/posts`, {
        params: { userId }
    });
        return res.data;
    },

    async createPost(postData: PostCreateData) : Promise<PostInfo> {
        const res = await axiosInstance.post(`/posts`, postData);
        return res.data;
    },

    async updatePost(id: number, postData: PostUpdateData) : Promise<PostInfo> {
        const res = await axiosInstance.put(`/posts/${id}`, postData);
        return res.data;
    },

    async deletePost(id: number) {
        await axiosInstance.delete(`/posts/${id}`);
    },

    async likePost(id: number) {
        await axiosInstance.post(`/posts/${id}/like`);
    },

    async unlikePost(id: number) {
        await axiosInstance.delete(`/posts/${id}/like`)
    }

}