import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import { loginSuccess } from "../../features/auth/authSlice";
// import axios from "axios";
import { api } from '../../services/api';

const Login = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
      
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { setToken } = useToken();
      
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
            const res = await api.post("http://localhost:5000/api/users/login", {
              username,
              password,
            });
      
            const { token, userId } = res.data;
            setToken(token);
            dispatch(loginSuccess({ user: userId, token }));
            navigate("/dashboard");
          } catch (err: any) {
            alert(err.response?.data?.message || "Ошибка при входе");
          }
        };
      const hendlClick = (e: React.MouseEvent) => {
      console.log("click");
      }
        return (
          <div>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Имя пользователя"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
              />
              <button onClick={hendlClick}>Войти</button>
            </form>
          </div>
        );
      };
      
      export default Login;
