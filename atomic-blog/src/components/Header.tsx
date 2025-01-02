import { useContext } from "react";
import SearchPosts from "./SearchPosts";
import Results from "./Results";
import { PostContext } from "../context/PostContext";

export default function Header() {
  const { onClearPosts } = useContext(PostContext)!;

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}
