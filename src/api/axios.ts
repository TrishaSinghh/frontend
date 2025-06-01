// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://pharminc-backend.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Automatically attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
