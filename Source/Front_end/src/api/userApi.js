import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const register = async (username, password, role, email, firstname, lastname) => {
  const response = await axios.post(`${BASE_URL}/api/user/register/`, {
    username,
    password,
    role,
    email,
    firstname: firstname,
    lastname: lastname,
  });
  return response.data;
};

export const login = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/api/user/login/`, {
    username,
    password,
  });
  console.log(response.data);
  return response.data;
};

export const resetPassword = async (currentPassword, newPassword) => {
  // 从 localStorage 获取 token
  const token = localStorage.getItem("token");

  // 发送带有 token 的请求
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/change-password/`,
      {
        old_password: currentPassword,
        new_password: newPassword,
      },
      {
        headers: {
          // 设置 token 到 Authorization header
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error resetting password: ${error}`);
    return { status: "error", message: "Invalid Token" };
  }
};

export const resetPasswordByEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/send-email/`, {
      email
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { message: "Error from server" }
  }
}