import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteAuthProps {
  children: React.ReactNode;
}

const ProtectedRoutAuth: React.FC<ProtectedRouteAuthProps> = ({ children }) => {
  const { isLogin } = useSelector((state: any) => state.auth);
  console.log(isLogin);

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutAuth;
