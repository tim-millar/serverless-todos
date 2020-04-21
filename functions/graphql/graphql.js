const { ApolloServer, gql } = require("apollo-server-lambda");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    todos: [Todo]!
  }
  type Todo {
    id: ID!
    text: String!
    done: Boolean!
  }
  type Mutation {
    addTodo(text: String!): Todo
    updateTodoDone(id: ID!): Todo
  }
`;

const todos = {};
let todoIndex = 0;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: () => Object.values(todos),
  },
  Mutation: {
    addTodo: (_, { text }) => {
      todoIndex++;
      const id = `key-${todoIndex}`;
      todos[id] = { id, text, done: false };
      return todos[id];
    },
    updateTodoDone: (_, { id }) => {
      todos[id].done = !todo[id].done;
      return todos[id];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (when `process.env.NODE_ENV` is `production`)
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
