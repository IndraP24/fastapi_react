import React from 'react';
import { render } from 'react-dom';
import { jsx } from '@emotion/react'
import { ThemeProvider  } from '@chakra-ui/core';

import Header from './components/Header';
import reportWebVitals from './reportWebVitals';

function App() {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();