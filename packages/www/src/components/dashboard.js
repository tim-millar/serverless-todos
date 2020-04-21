import React, { useContext, useRef } from "react";
import { Link } from "@reach/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Flex,
  Container,
  Button,
  Input,
  Label,
  NavLink,
  Checkbox,
} from "theme-ui";
import { IdentityContext } from "../../identity-context";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation updateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      text
      done
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

const Dash = (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  const inputRef = useRef();
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const [addTodo] = useMutation(ADD_TODO);

  console.log("hello mum");
  console.log("data", data);
  return (
    <div>
      <Container>
        <Flex as="nav">
          <NavLink as={Link} to="/" p={2}>
            Home
          </NavLink>
          <NavLink as={Link} to="/app" p={2}>
            Dashboard
          </NavLink>
          {user && (
            <NavLink
              as={Link}
              to="/"
              p={2}
              onClick={() => netlifyIdentity.logout()}
            >
              Log out {user.user_metadata.full_name}
            </NavLink>
          )}
        </Flex>
        <Flex
          as="form"
          onSubmit={async (e) => {
            e.preventDefault();
            await addTodo({ variables: { text: inputRef.current.value } });
            inputRef.current.value = "";
            await refetch();
          }}
        >
          <Label sx={{ display: "flex" }}>
            <span>Add&nbsp;Todo</span>
            <Input ref={inputRef} sx={{ marginLeft: 1 }} />
          </Label>
          <Button sx={{ marginLeft: 1 }}>Submit</Button>
        </Flex>
        <Flex sx={{ flexirection: "column" }}>
          {loading ? <div>Loading...</div> : null}
          {error ? <div>{error.message}</div> : null}
          {!loading && !error && (
            <ul sx={{ listStyleType: "none" }}>
              {data.todos.map((todo) => (
                <Flex
                  as="li"
                  key={todo.id}
                  onClick={async () => {
                    await updateTodoDone({ variables: { id: todo.id } });
                    await refetch();
                  }}
                >
                  <Checkbox checked={todo.done} />
                  <span>{todo.text}</span>
                </Flex>
              ))}
            </ul>
          )}
        </Flex>
      </Container>
    </div>
  );
};

export default Dash;
