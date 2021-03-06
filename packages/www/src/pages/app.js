import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import { Flex, Container, Heading, Button, NavLink } from "theme-ui";
import { IdentityContext } from "../../identity-context";
import Dash from "../components/dashboard";

const DashLoggedOut = (props) => {
  const { identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to="/app" p={2}>
          Dashboard
        </NavLink>
      </Flex>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">Get Stuff Done</Heading>
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Log In
        </Button>
      </Flex>
    </Container>
  );
};

export default (props) => {
  const { user } = useContext(IdentityContext);

  if (!user) {
    return (
      <Router>
        <DashLoggedOut path="/app" />
      </Router>
    );
  }

  return (
    <Router>
      <Dash path="/app" />
    </Router>
  );
};
