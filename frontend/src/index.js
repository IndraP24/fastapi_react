import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';
import { theme, ThemeProvider } from "@chakra-ui/react";
import React , { StrictMode }from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ColorModeScript />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);