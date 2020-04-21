const React = require("react");
const {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} = require("@apollo/client");
const { setContext } = require("apollo-link-context");
const netlifyIdentity = require("netlify-identity-widget");
const wrapRootElement = require("./wrap-root-element");

const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentity.currentUser();
  const token = user.token.access_token;
  const authorization = token ? `Bearer ${token}` : "";
  return {
    headers: {
      ...headers,
      Authorization: authorization,
    },
  };
});

const httpLink = new HttpLink({
  uri: "https://serverless-todos.netlify.app/.netlify/functions/graphql",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

exports.wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    {wrapRootElement({ element })}
  </ApolloProvider>
);
