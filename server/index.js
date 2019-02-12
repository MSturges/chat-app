import { ApolloServer } from "apollo-server";
const schema = require("./schema");

const PORT = 8080;
const server = new ApolloServer(schema);
server
  .listen({ port: PORT })
  .then(({ url }) => console.log(`🚀 Server ready at ${url}`));
