import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: "'Lato', sans-serif",
    heading: "'Lato', sans-serif",
  },
  colors: {
    custom: {
      main: '#E1ECF0',
      primary: '#003A64',
      secondary: '#54A2D2',
      tertiary: '#A9CEE8',
      accent: '#ec9b00',
      pop: '#ff0000',
    },
  },
});

export default theme;