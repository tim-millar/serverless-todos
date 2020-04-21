const React = require("react");
const {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} = require("@apollo/client");
const wrapRootElement = require("./wrap-root-element");

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://serverless-todos.netlify.app/.netlify/functions/graphql",
  }),
});

exports.wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    {wrapRootElement({ element })}
  </ApolloProvider>
);
