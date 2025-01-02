import React from "react";
import { PostType } from "../types";
import Posts from "./Posts";
import FormAddPost from "./FormAddPost";

export default function Main({
  posts,
  onAddPost,
}: {
  posts: PostType[];
  onAddPost: (post: PostType) => void;
}) {
  return (
    <main>
      <FormAddPost onAddPost={onAddPost} />
      <Posts posts={posts} />
    </main>
  );
}
