import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postReducer from "../features/posts/postSlice";

export const store = configureStore({
  reducer: {
   auth: authReducer, // позже добавим
   posts: postReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;