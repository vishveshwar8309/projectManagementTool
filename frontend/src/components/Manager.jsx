import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const Manager = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.role === "Manager" ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};

export default Manager;
