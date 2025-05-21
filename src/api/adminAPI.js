import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/api/admins`,  
  withCredentials: true,
});

export const postAdmin = (data) => API.post("/", data);
export const getAdmin = (page = 1, search = "") => API.get("/",{params: { page, limit: 5, search }});

export const updateAdmin = (id, data) => API.put(`/${id}`, data);
export const deleteAdmin = (id) => API.delete(`/${id}`);