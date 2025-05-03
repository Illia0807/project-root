import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./app/components/PrivateRoute";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import Dashboard from "./app/pages/Dashboard";
import PostList from "./features/posts/PostList";
import MyPosts from "./features/posts/MyPosts";
import CreatePost from "./features/posts/CreatePost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Страницы для входа и регистрации */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Защищённый маршрут для Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Новые маршруты для создания поста и отображения постов */}
          <Route path="/" element={<PostList />} />{" "}
          {/* Главная страница с постами */}
          <Route path="/my-posts" element={<MyPosts />} /> {/* Мои посты */}
          <Route path="/create-post" element={<CreatePost />} />{" "}
          {/* Страница создания поста */}
          {/* Роут по умолчанию, если страница не найдена */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
