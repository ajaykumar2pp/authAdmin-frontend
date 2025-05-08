import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/api/admins`,  
});

export const postAdmin = (data) => API.post("/", data);
export const getAdmin = (page = 1, search = "") => API.get("/",{params: { page, limit: 5, search }});