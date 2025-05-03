import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { fetchAllPosts } from "./postSlice";
import "../../App.css"
export default function PostList() {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state) => state.posts);
const{user}= useAppSelector((state)=>state.auth)
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="post-list">
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div className="post-item" key={post.id}>
      <p> {post.user_id===Number(user)?"its your post":'' }</p> 
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>Автор: {post.user_id}</small>
        </div>
      ))}
    </div>
  );
}