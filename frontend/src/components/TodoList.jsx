import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
    Button,
    IconButton,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
    HStack,
    Text,
    useDisclosure,
    StackDivider,
    Spacer
} from "@chakra-ui/react";

const TodosContext = React.createContext({
    todos: [], fetchTodos: () => {}
})


function UpdateTodo({item, id}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [todo, setTodo] = useState(item)
    const {fetchTodos} = React.useContext(TodosContext)

    const updateTodo = async () => {
        await fetch(`http://localhost:8000/todo/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item: todo })
        })
        onClose()
        await fetchTodos()
    }

    return (
        <>
            <IconButton icon={ < FaEdit/> } isRound="true" onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Update Todo</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                <InputGroup size="md">
                    <Input
                    pr="4.5rem"
                    type="text"
                    placeholder="Add a todo item"
                    aria-label="Add a todo item"
                    value={todo}
                    onChange={event => setTodo(event.target.value)}
                    />
                </InputGroup>
                </ModalBody>

                <ModalFooter>
                <Button h="2rem" size="sm" onClick={updateTodo}>Update</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    )
}


function DeleteTodo({id}) {
    const {fetchTodos} = React.useContext(TodosContext)

    const deleteTodo = async () => {
        await fetch(`http://localhost:8000/todo/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: { "id": id }
        })
        await fetchTodos()
    }

    return (
        <IconButton icon={ <FaTrash /> } isRound="true" onClick={deleteTodo} />
    )
}


function TodoHelper({item, id, fetchTodos}) {
    return (
        <HStack key={id}>
            <Text>{item}</Text>
            <Spacer />
            <UpdateTodo item={item} id={id} fetchTodos={fetchTodos}/>
            <DeleteTodo id={id} fetchTodos={fetchTodos}/>
        </HStack>
    )
}



export default function Todos() {
    const [todos, setTodos] = useState([])
    const fetchTodos = async () => {
        const response = await fetch("http://localhost:8000/todo")
        const todos = await response.json()
        setTodos(todos.data)
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <TodosContext.Provider value={{todos, fetchTodos}}>
            <VStack 
                divider={ <StackDivider /> } 
                borderColor="gray.500" 
                borderWidth="2px" 
                p="4"
                borderRadius="lg"
                w="100%"
                maxW={{base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw"}}
                alignItems="stretch"
            >
                {todos.map((todo) => (
                    <TodoHelper item={todo.item} id={todo.id} fetchTodos={fetchTodos} />
                ))}
            </VStack>
        </TodosContext.Provider>
    )
}