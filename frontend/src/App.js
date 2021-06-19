import React from 'react';
import { Heading, VStack } from '@chakra-ui/react';
import Todos from "./components/TodoList";

function App() {
  return (
    <VStack>
      <Heading>Todo Application</Heading>
      <Todos />
    </VStack>
  );
}

export default App;
