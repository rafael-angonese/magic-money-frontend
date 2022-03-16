import Router from "next/router";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { removeCookies, setToken } from "../lib/nookies";
import api from "../services/api";
import handlingErrors from "../utils/handlingErrors";

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
  logout: () => void;
}
export const AuthContext = createContext({} as IAuthContextType);

export function AuthProvider({ children }: IAuthProviderProps) {
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

  async function logout() {
    removeCookies();
  }

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
      const { token } = response.data;

      setToken(token);

      toast.success("Login efetuado com sucesso!");

      Router.push("/dashboard");
    } catch (error) {
      const response = handlingErrors(error);
      if (response) {
        toast.error("Credências inválidas");
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
