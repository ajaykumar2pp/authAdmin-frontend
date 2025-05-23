import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/api/auth`, 
  withCredentials: true, 
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const generate2FA = (data) => API.get("/2fa/generate", data);
export const verify2FA = (data) => API.post("/2fa/verify", data);
export const getUser = () => API.get("/me");