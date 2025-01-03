import { usePost } from "../context/PostContext";

export default function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePost();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}
