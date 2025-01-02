import React from "react";
import { PostType } from "../types";

export default function Results({ posts }: { posts: PostType[] }) {
  return <p>🚀 {posts.length} atomic posts found</p>;
}
