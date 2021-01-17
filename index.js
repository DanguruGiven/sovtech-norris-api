const { ApolloServer, gql } = require("apollo-server");

const fetch = require("node-fetch");

const chuckAPI = `https://api.chucknorris.io/jokes/random?category=`;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Joke {
    categories: [String]
    createdAt: String
    iconUrl: String
    id: String
    updatedAt: String
    url: String
    value: String
  }

  type Query {
    hello: String
    joke(category: String!): Joke
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello Vusi!",
    joke: (root, args, context) =>
      fetch(chuckAPI + args.category).then((res) => res.json())
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
