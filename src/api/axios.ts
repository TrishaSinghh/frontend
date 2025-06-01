import axios from "axios";

const api = axios.create({
  baseURL: "https://pharminc-backend.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // Only attach token for protected endpoints
  const publicEndpoints = ["/auth/register", "/auth/login"];
  const isPublic = publicEndpoints.some(endpoint =>
    config.url?.includes(endpoint)
  );
  if (!isPublic) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
