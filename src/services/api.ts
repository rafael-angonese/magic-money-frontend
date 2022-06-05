import axios from "axios";
import { getToken, removeCookies, setToken } from "../lib/nookies";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});


api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === "auth/refreshToken" && error.response) {
      removeCookies();
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.post(
          "auth/refreshToken",
          {},
          {
            withCredentials: true,
          }
        );

        const { token } = response.data;

        setToken(token);

        originalRequest.headers["Authorization"] = `Bearer ${token}`;

        return api(originalRequest);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
