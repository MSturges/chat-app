require("dotenv").config();
import { ApolloServer } from "apollo-server";
const mongoose = require("mongoose");

const schema = require("./schema");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

const PORT = 8080;
const server = new ApolloServer(schema);
server
  .listen({ port: PORT })
  .then(({ url }) => console.log(`🚀 Server ready at ${url}`));
