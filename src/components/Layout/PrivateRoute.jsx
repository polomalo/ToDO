import { Outlet, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { ROUTES } from "@constants/routes";

const PrivateRoute = () => {
  const isAuth =  useSelector(state => state.auth.token);
  return isAuth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default PrivateRoute;