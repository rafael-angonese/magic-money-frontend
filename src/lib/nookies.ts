import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "../config/constants";

const path = "/";

export const removeCookies = () => {
  destroyCookie(undefined, TOKEN_KEY, {
    path,
  });
  destroyCookie(undefined, REFRESH_TOKEN_KEY, {
    path,
  });
  Router.push("/");
};

export const setToken = (token: string, refreshToken: string) => {
  setCookie(undefined, REFRESH_TOKEN_KEY, refreshToken, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path,
  });
  setCookie(undefined, TOKEN_KEY, token, {
    maxAge: 60 * 60 * 1, // 1 hour
    path,
  });
};

export const getToken = (): string => {
  const { token } = parseCookies();

  return token;
};

export const getRefreshToken = (): string => {
  const { refreshToken } = parseCookies();

  return refreshToken;
};
