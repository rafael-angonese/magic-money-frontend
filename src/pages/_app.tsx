import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeContainer from "../contexts/theme/ThemeContainer";
import { AuthProvider } from "../contexts/AuthContext";

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
    </ThemeContainer>
  );
}

export default MyApp;
