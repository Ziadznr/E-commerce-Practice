import { Navigate } from 'react-router-dom';
import UserStore from '../store/UserStore';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const isLogin = UserStore((state) => state.loginStatus);

  // fallback check — if Zustand fails, check cookie directly
  if (!isLogin && !Cookies.get("token")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
