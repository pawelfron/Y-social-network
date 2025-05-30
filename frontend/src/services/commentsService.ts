import { CommentContent, CommentCreateData, CommentWithID, Comment } from "../interfaces/comment";
import { axiosInstance } from "./apiClient"

export const CommentsService = {

    async getPostComments(postId: number) : Promise<Comment[]>{
        const res = await axiosInstance.get(`/posts/${postId}/comments`);
        return res.data;
    },

    async addComment(commentData: CommentCreateData): Promise<CommentWithID>{
        const res = await axiosInstance.post(`/comments`, commentData);
        return res.data;
    },

    async getComment(commentId: number): Promise<Comment> {
        const res = await axiosInstance.get(`/commnents/${commentId}`);
        return res.data;
    },

    async editComment(commentId: number, commentContent: CommentContent): Promise<CommentContent> {
        const res = await axiosInstance.put(`/comments/${commentId}/edit`, commentContent);
        return res.data
    },

    async deleteComment(commentId: number){
        await axiosInstance.delete(`/comments/${commentId}/delete`);
    }
}