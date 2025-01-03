import React, { createContext, useContext, useState } from "react";
import { PostType } from "../types";
import { createRandomPost } from "../utils";

interface PostContextType {
  posts: PostType[];
  onClearPosts: () => void;
  onAddPost: (post: PostType) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const PostContext = createContext<PostContextType | null>(null);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post: PostType) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);

  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");

  if (!context) throw new Error("PostContext not found");

  return context;
}
