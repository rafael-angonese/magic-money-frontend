import { createContext, useEffect, useState, ReactNode } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

import api from "../services/api";
import { useToast } from "@chakra-ui/react";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IUser {
  name: string;
  email: string;
  avatar_url: string;
}

interface ISignInData {
  email: string;
  password: string;
}

interface IAuthContextType {
  isAuthenticated: boolean;
  user: IUser | null;
  signIn: (data: ISignInData) => Promise<void>;
}
export const AuthContext = createContext({} as IAuthContextType);

export function AuthProvider({ children }: IAuthProviderProps) {
  const toast = useToast();
  const [user, setUser] = useState<IUser | null>(null);

  const isAuthenticated = !!user;

  // useEffect(() => {
  //   const { token } = parseCookies();

  //   console.log(token)

  //   if (token) {
  //     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //     // recoverUserInformation().then(response => {
  //     //   setUser(response.user)
  //     // })
  //   }
  // }, []);

  async function signIn({ email, password }: ISignInData) {
    try {
      const response = await api.post(
        "/auth",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setCookie(undefined, "token", response.data.token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      // setUser(user);

      toast({
        title: "Login efetuado com sucesso!",
        status: "success",
        position: "top-right",
        isClosable: true,
      });

      Router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Credências inválidas",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
