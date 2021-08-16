import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Heading, VStack, IconButton, useColorMode } from '@chakra-ui/react';
import Todos from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <VStack p={4}>
      <IconButton 
        icon={ colorMode === "light" ? <FaSun /> : <FaMoon />} 
        isRound="true" 
        size="lg" 
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />

      <Heading 
        fontWeight="extrabold" 
        size="2xl" 
        bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
        bgClip="text"
        p={10}
      >
          Todo Application
      </Heading>

      <Todos />
      <AddTodo />
    </VStack>
  );
}

export default App;
