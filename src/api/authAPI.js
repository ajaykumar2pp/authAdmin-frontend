import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/api/auth`,  
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);