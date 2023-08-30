import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 引入全局状态管理库或者 Context API

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 清除本地存储的数据
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // ...其他的清理工作

    // 更新全局状态，设置通知消息
    // setNotification('你已经成功登出');

    // 导航到登录页面
    navigate("/authentication/sign-in");
  }, [navigate]);

  return null; // 这个组件不需要渲染任何内容
};

export default Logout;
