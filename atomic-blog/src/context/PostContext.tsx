import { createContext } from "react";
import { PostType } from "../types";

interface PostContextType {
  posts: PostType[];
  onClearPosts: () => void;
  onAddPost: (post: PostType) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const PostContext = createContext<PostContextType | null>(null);
