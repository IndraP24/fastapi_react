import React from 'react'
import { Input, HStack, Button } from "@chakra-ui/react";

const TodosContext = React.createContext({
    todos: [], fetchTodos: () => {}
})


function AddTodo() {
    const [item, setItem] = React.useState("")
    const {todos, fetchTodos} = React.useContext(TodosContext)

    const handleInput = event => {
        setItem(event.target.value)
    };

    const handleSubmit = () => {
        const newTodo = {
            "id": todos.length + 1,
            "item": item
        }
        
        fetch("http://localhost:8000/todo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo)
        }).then(fetchTodos)
    };

    return (
        <form onSubmit={handleSubmit}>
            <HStack mt="8">
                <Input
                    variant="filled"
                    type="text"
                    placeholder="Add a todo item"
                    aria-label="Add a todo item"
                    value={item}
                    onChange={handleInput}
                />
                <Button colorScheme="pink" px="8" type="submit">
                    Add Todo
                </Button>
            </HStack>
        </form>
    );
}

export default AddTodo
