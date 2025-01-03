import { usePost } from "../context/PostContext";

export default function Results() {
  const { posts } = usePost();

  return <p>🚀 {posts.length} atomic posts found</p>;
}
