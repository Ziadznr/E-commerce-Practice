// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import UserStore from '../store/UserStore';

const PrivateRoute = ({ children }) => {
  const isLogin = UserStore((state) => state.loginStatus);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
