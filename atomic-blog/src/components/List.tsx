import { memo } from "react";
import { usePost } from "../context/PostContext";
// import Test from "../Test";

const List = memo(function List() {
  const { posts } = usePost();

  return (
    <>
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {/* <Test /> */}
    </>
  );
});

export default List;
