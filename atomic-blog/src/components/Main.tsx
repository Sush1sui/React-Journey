import Posts from "./Posts";
import FormAddPost from "./FormAddPost";
import { memo } from "react";

const Main = memo(function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
});

export default Main;
