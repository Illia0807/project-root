import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logout } from '../../features/auth/authSlice';
import { useToken } from '../hooks/useToken';
import { useNavigate } from 'react-router-dom';
import PostList from '../../features/posts/PostList';
import CreatePost from '../../features/posts/CreatePost';
import '../../App.css'; 

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const { clearToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleLogout = () => {
    clearToken();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user || 'пользователь'}!</h1>
        <button className="logout-button" onClick={handleLogout}>Exit</button>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-posts">
          <PostList/>
        </div>
        <div>
          <CreatePost/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;