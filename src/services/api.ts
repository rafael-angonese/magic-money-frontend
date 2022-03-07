import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const { token } = parseCookies();
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
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (originalRequest.url !== '/auth' && error.response) {

      if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const response = await api.post('auth/refreshToken', {}, {
            withCredentials: true
          })

          const { token } = response.data

          setCookie(undefined, "token", token, {
            maxAge: 60 * 60 * 1, // 1 hour
          });

          originalRequest.headers["Authorization"] = `Bearer ${response.data.token}`;

          return api(originalRequest)

        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }
)

export default api;
