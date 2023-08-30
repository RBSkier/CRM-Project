export const BASE_URL = "http://localhost:8000";

export const getToken = () => {
	return localStorage.getItem("token");
};
