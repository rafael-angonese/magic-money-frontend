import { extendTheme } from '@chakra-ui/react';

const defaultTheme = extendTheme({
  config: {
    initialColorMode: 'dark'
  },
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
    mono: 'Menlo, monospace'
  },
  colors: {
    purple: {
      500: '#8257e5'
    },
  }
});

export default defaultTheme;
