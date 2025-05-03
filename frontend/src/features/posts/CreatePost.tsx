import { useState } from "react";
import { useAppDispatch } from "../../app/hooks/hooks";
import { createPost } from "./postSlice";
import "../../App.css"; 
export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createPost({ title, content }));
    setTitle("");
    setContent("");
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <h2>Создать пост</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Содержимое"
        required
      />
      <button type="submit">Опубликовать</button>
    </form>
  );
}