import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeContainer from "../contexts/theme/ThemeContainer";

import "../config/yup.locale.pt-br";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContainer>
      <Component {...pageProps} />
    </ThemeContainer>
  );
}

export default MyApp;
