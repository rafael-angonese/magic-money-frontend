import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeContainer from "../contexts/theme/ThemeContainer";
import { AuthProvider } from "../contexts/AuthContext";

import "../config/yup.locale.pt-br";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContainer>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeContainer>
  );
}

export default MyApp;
