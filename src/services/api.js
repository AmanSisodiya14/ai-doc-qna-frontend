import axios from "axios";
import { STORAGE_KEYS } from "../redux/storage";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 100000,
});

api.interceptors.request.use(
  (config) => {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
    const auth = raw ? JSON.parse(raw) : null;

    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default api;
