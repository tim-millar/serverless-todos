import React, { useContext, useRef, useReducer } from "react";
import { Link } from "@reach/router";
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

const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [{ done: false, value: action.payload }, ...state];
    case "toggleTodoDone": {
      const newState = [...state];
      newState[action.payload] = {
        done: !newState[action.payload].done,
        value: newState[action.payload].value,
      };
      return newState;
    }
    default:
      return state;
  }
};

const Dash = (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todosReducer, []);

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
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: "addTodo", payload: inputRef.current.value });
            inputRef.current.value = "";
          }}
        >
          <Label sx={{ display: "flex" }}>
            <span>Add&nbsp;Todo</span>
            <Input ref={inputRef} sx={{ marginLeft: 1 }} />
          </Label>
          <Button sx={{ marginLeft: 1 }}>Submit</Button>
        </Flex>
        <Flex sx={{ flexirection: "column" }}>
          <ul sx={{ listStyleType: "none" }}>
            {todos.map((todo, idx) => (
              <Flex
                as="li"
                key={todo.value}
                onClick={() => {
                  dispatch({ type: "toggleTodoDone", payload: idx });
                }}
              >
                <Checkbox checked={todo.done} />
                <span>{todo.value}</span>
              </Flex>
            ))}
          </ul>
        </Flex>
      </Container>
    </div>
  );
};

export default Dash;
