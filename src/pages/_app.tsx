import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import ThemeContainer from "../contexts/theme/ThemeContainer";
import { AuthProvider } from "../contexts/AuthContext";
import { AccountProvider } from "../contexts/AccountContext";

import "react-toastify/dist/ReactToastify.css";
import "../config/yup.locale.pt-br";
import Layout from "../components/Layout/Layout";

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
      <ToastContainer theme="dark" />
    </ThemeContainer>
  );
}

export default MyApp;
