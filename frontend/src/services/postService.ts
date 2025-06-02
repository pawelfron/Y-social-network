import { PostCreateData, PostDetails, PostInfo, PostSummary, PostUpdateData } from "../interfaces/post";
import { axiosInstance } from "./apiClient";

export const PostService ={
    
    async searchPosts(onlyFollowed: boolean, searchQuery: string): Promise<PostDetails[]> {
        const res = await axiosInstance.get(`/posts?onlyFollowed=${onlyFollowed}&search=${searchQuery}`);
        return res.data;
    },

    async getUserPosts(userId: number): Promise<PostDetails[]> {
        const res = await axiosInstance.get(`/posts`);
        return res.data.filter((post: PostSummary) => post.author.id === userId);
    }
,

    async createPost(postData: PostCreateData) : Promise<PostInfo> {
          const formData = new FormData();

        Object.entries(postData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
            if (key === "image"){
                formData.append(key, value as File);
            } else {
                formData.append(key, value as string);
            }
            
            }
        });

        const res = await axiosInstance.post(`/posts`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });

        return res.data;
    },

    async updatePost(id: number, postData: PostUpdateData) : Promise<PostInfo> {
        const formData = new FormData();

        Object.entries(postData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
            if (key === "image"){
                formData.append(key, value as File);
            } else {
                formData.append(key, value as string);
            }
            
            }
        });

        const res = await axiosInstance.put(`/posts/${id}`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });

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