import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import ThemeContainer from "../contexts/theme/ThemeContainer";
import { AuthProvider } from "../contexts/AuthContext";

import "react-toastify/dist/ReactToastify.css";
import "../config/yup.locale.pt-br";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps, router }: AppProps) {
  const isAuthenticatedRoutes = router.pathname !== "/";

  return (
    <ThemeContainer>
      <AuthProvider>
        {isAuthenticatedRoutes && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
        {!isAuthenticatedRoutes && <Component {...pageProps} />}
      </AuthProvider>
      <ToastContainer  theme="dark" />
    </ThemeContainer>
  );
}

export default MyApp;
