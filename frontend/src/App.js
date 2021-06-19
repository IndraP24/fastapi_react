import React from 'react';
import { Heading, ChakraProvider } from '@chakra-ui/react';
import Todos from "./components/TodoList";

function App() {
  return (
    <ChakraProvider>
      <Heading>Todo Application</Heading>
      <Todos />
    </ChakraProvider>
  );
}

export default App;
