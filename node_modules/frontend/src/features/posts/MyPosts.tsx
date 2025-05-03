import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { fetchMyPosts } from "./postSlice";

export default function MyPosts() {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

  return (
    <div>
      <h2>Мои посты</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
