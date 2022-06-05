import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "../contexts/AuthContext";
import { AccountProvider } from "../contexts/AccountContext";

import Layout from "../components/Layout/Layout";
import ThemeContainer from "../lib/theme/ThemeContainer";

import "../styles/globals.css";
import "../config/yup.locale.pt-br";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const isAuthenticatedRoutes = router.pathname !== "/";
  const AnyComponent = Component as any;
  
  return (
    <>
      <ThemeContainer>
        <AuthProvider>
          {isAuthenticatedRoutes && (
            <AccountProvider>
              <Layout>
                <AnyComponent {...pageProps} />
              </Layout>
            </AccountProvider>
          )}
          {!isAuthenticatedRoutes && <AnyComponent {...pageProps} />}
        </AuthProvider>
      </ThemeContainer>
    </>
  );
};

export default MyApp;
