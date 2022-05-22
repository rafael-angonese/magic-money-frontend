import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "../contexts/AuthContext";
import { AccountProvider } from "../contexts/AccountContext";

import Layout from "../components/Layout/Layout";
import ThemeContainer from "../lib/theme/ThemeContainer";

import "../styles/globals.css";
import "../config/yup.locale.pt-br";

function MyApp({ Component, pageProps, router }: AppProps) {
  const isAuthenticatedRoutes = router.pathname !== "/";

  return (
    <ThemeContainer>
      <AuthProvider>
        {isAuthenticatedRoutes && (
          <AccountProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AccountProvider>
        )}
        {!isAuthenticatedRoutes && <Component {...pageProps} />}
      </AuthProvider>
    </ThemeContainer>
  );
}

export default MyApp;
