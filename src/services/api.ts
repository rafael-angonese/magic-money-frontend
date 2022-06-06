import axios from "axios";
import {
  getRefreshToken,
  getToken,
  removeCookies,
  setToken,
} from "../lib/nookies";

let isRefreshing = false;
let refreshSubscribers = [] as any[];

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
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

    if (error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        const refreshTokenCookie = getRefreshToken();
        api
          .post("auth/refreshToken", {
            refreshToken: refreshTokenCookie,
          })
          .then((response) => {
            isRefreshing = false;
            const { token, refreshToken } = response.data;
            setToken(token, refreshToken);
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            onRrefreshed(token);
          });
      }

      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          resolve(axios(originalRequest));
        });
      });
      return retryOrigReq;
    } else {
      return Promise.reject(error);
    }
  }
);

function subscribeTokenRefresh(cb: any) {
  refreshSubscribers.push(cb);
}

function onRrefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
}

export default api;
