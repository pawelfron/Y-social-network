import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { PostDetails } from "../interfaces/post";
import { useUser } from "./UserContext";
import { UserService } from "../services/userService";
import { PostService } from "../services/postService";
import { AuthService } from "../services/authService";


type PostsListContextType = {
  posts: PostDetails[];
  ownPosts: PostDetails[];
  addPost: (post: PostDetails) => void;
  removePost: (postId: number) => void;
  refreshPosts: () => void;
  isLoaded: boolean;
};

const PostsListContext = createContext<PostsListContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const PostsProvider = ({children}: Props) => {

    const [posts, setPosts] = useState<PostDetails[]>([])

    const [ownPosts, setOwnPosts] = useState<PostDetails[]>([])

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    // const {user} = useUser();
    // const currentUserId = user?.id;
    const authService = AuthService.get_instance();
    const currentUserId = authService.getUserId();

    useEffect(() => {
        const fetchPosts = async () => {
            if (!currentUserId) {
                return;
            }

            const allPosts = await PostService.searchPosts(false, "");
            setPosts(allPosts);

            const ownPosts = await PostService.getUserPosts(currentUserId);
            setOwnPosts(ownPosts);

            setIsLoaded(true);
        };

        fetchPosts();
    }, [currentUserId]);

    const addPost = (post: PostDetails) => {
        if (!currentUserId) return;
        
        setPosts(prev => [post, ...prev]);
        setOwnPosts(prev => [post, ...prev]);
    }

    const removePost = (postId: number) => {
        if (!currentUserId) return;

        setPosts(prev => prev.filter(post => post.id !== postId));
    };

    const refreshPosts = async () => {
        if (!currentUserId) return;

        setIsLoaded(false);

        const allPosts = await PostService.searchPosts(false, "");
            setPosts(allPosts);

        const ownPosts = await PostService.getUserPosts(currentUserId);
        setOwnPosts(ownPosts);

        setIsLoaded(true);
    }


    return (
    <PostsListContext.Provider value={{ posts, ownPosts, addPost, removePost, refreshPosts, isLoaded}}>
      {children}
    </PostsListContext.Provider>
  );
}

export const usePosts = () => {
    const context = useContext(PostsListContext);
    
    if (!context) {
        throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}


