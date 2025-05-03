import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAuth();
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
