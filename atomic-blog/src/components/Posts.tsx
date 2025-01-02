import React from "react";
import { PostType } from "../types";
import List from "./List";

export default function Posts({ posts }: { posts: PostType[] }) {
  return (
    <section>
      <List posts={posts} />
    </section>
  );
}
