import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "styled-components";

import theme from "../../styles/theme";
import ThemeContext from "./themeContext";
import { useTheming } from "./useThemeing";
import { Themes } from "./themes";
import { ToastContainer } from "react-toastify";

const ThemeContainer: React.FC = ({ children }) => {
  const themingValue = useTheming(Themes.dark);

  return (
    <>
      <ThemeContext.Provider value={themingValue}>
        <ThemeProvider theme={themingValue.currentTheme}>
          <ChakraProvider theme={theme}>
            {children}
            <ToastContainer theme="dark" />
            {/* <GlobalStyles /> */}
          </ChakraProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};
export default ThemeContainer;
