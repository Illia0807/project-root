// frontend/features/posts/postSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
}

interface PostState {ф
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

// Загрузить все посты
export const fetchAllPosts = createAsyncThunk("posts/fetchAll", async () => {
  const res = await axios.get("/api/posts");
  return res.data;
});

// Загрузить посты текущего пользователя
export const fetchMyPosts = createAsyncThunk("posts/fetchMy", async (_, { getState }) => {
  const token = (getState() as any).auth.token;
  const res = await axios.get("/api/posts/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

// Создать пост
export const createPost = createAsyncThunk(
  "posts/create",
  async ({ title, content }: { title: string; content: string }, { getState }) => {
    const token = (getState() as any).auth.token;
    const res = await axios.post(
      "/api/posts",
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.post;
  }
);
export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, content }: { id: number; content: string }, { getState }) => {
    const token = (getState() as any).auth.token;
    const res = await axios.put(
      `/api/posts/${id}`,
      { content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.post;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка";
      })

      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload); // добавляем новый пост
      });
      
  },
});

export default postSlice.reducer;
