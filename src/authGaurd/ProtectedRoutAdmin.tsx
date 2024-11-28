import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteAuthProps {
  children: React.ReactNode;
}

const ProtectedRoutAdmin: React.FC<ProtectedRouteAuthProps> = ({
  children,
}) => {
  const { isLogin } = useSelector((state: any) => state.auth);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutAdmin;
