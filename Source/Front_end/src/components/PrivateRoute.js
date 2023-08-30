import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  let location = useLocation();

  let token = localStorage.getItem("token"); // 获取本地存储的 token

  return token ? children : <Navigate to="/login" state={{ from: location }} />; // 如果 token 存在，则渲染子组件，否则导航到登录页面
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
