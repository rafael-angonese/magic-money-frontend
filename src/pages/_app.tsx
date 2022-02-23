import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeContainer from "../contexts/theme/ThemeContainer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContainer>
      <Component {...pageProps} />
    </ThemeContainer>
  );
}

export default MyApp;
