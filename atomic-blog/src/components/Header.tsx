import React from "react";
import { PostType } from "../types";
import SearchPosts from "./SearchPosts";
import Results from "./Results";

export default function Header({
  posts,
  onClearPosts,
  searchQuery,
  setSearchQuery,
}: {
  posts: PostType[];
  onClearPosts: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results posts={posts} />
        <SearchPosts
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}
