import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { TiTick } from "react-icons/ti";
import { VscClose } from "react-icons/vsc";

function App() {
  const [todos, setTodos] = useState<any>(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem("todos");
    // if there are todos stored
    if (savedTodos) {
      // return the parsed JSON object back to a javascript object
      return JSON.parse(savedTodos);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });
  const [input, setInput] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (input !== "") {
      const newTodo = {
        id: new Date().getTime(),
        name: input,
        isCompleted: false,
      };
      //@ts-ignore
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo: any) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleComplete = (id: number) => {
    const newState = todos.map((todo: any) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });

    setTodos(newState);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Container>
      <Flex direction="column" mt={32}>
        <Heading mb={10} textAlign="center">
          Todo App
        </Heading>
        <Text>Add title</Text>
        <form onSubmit={handleSubmit}>
          <Flex direction="row" experimental_spaceX={2}>
            <Input
              placeholder="Clean my room"
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
            />
            <Button colorScheme="green" type="submit">
              Add
            </Button>
          </Flex>
        </form>

        <Flex direction="column" mt={10}>
          {todos.map(({ id, name, isCompleted }: any) => (
            <Flex
              key={id}
              direction="row"
              justify="space-between"
              align="center"
              p={4}
              borderBottom="1px solid #ccc"
            >
              <Text textDecoration={isCompleted ? "line-through" : "none"}>
                {name}
              </Text>
              <Flex>
                {!isCompleted ? (
                  <TiTick
                    size={32}
                    color="green"
                    onClick={() => handleComplete(id)}
                  />
                ) : null}
                <VscClose
                  size={32}
                  color="red"
                  onClick={() => handleDelete(id)}
                />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}

export default App;
