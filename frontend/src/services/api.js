import axios from "axios";

// Central axios instance. Base URL is configurable via VITE_API_URL so the
// same build works against a local proxy or a deployed Render backend.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
