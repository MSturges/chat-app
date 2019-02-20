require("dotenv").config();
import { ApolloServer, AuthenticationError } from "apollo-server";
const mongoose = require("mongoose");
import jwt from "express-jwt";
import jsonwebtoken from "jsonwebtoken";

const schema = require("./schema");
import { JWT_SECRET } from "./config";
import GetUserQuery from "./database/queries/user/getUser";

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

const PORT = 8080;
const server = new ApolloServer({
  // An object or function called with the current request that creates the context shared across all resolvers
  context: ({ req, res, connection }) => {
    // web socket subscriptions will return a connection
    if (connection) {
      // check connection for metadata
      return connection.context;
    }
    const user = new Promise((resolve, reject) => {
      jwt({
        secret: JWT_SECRET,
        // Note that by setting credentialsRequired: false, we allow non-authenticated requests to pass through the middleware.
        // This is required so we can allow signup and login requests (and others) through the endpoint.
        credentialsRequired: false
      })(req, res, e => {
        if (req.user) {
          resolve(GetUserQuery(req.user.id));
        } else {
          resolve(null);
        }
      });
    });
    return {
      user
    };
  },
  subscriptions: {
    // onConnect parameter, which is a function that runs before every WebSocket connection
    onConnect(connectionParams, websocket, wsContext) {
      // First, onConnect will use jsonwebtoken to verify and decode connectionParams.jwt to extract a User from the database.
      // It will do this work within a new Promise called user.

      // this could be refactored, did this to work with graphql interface and client...
      let formattedJWT = "";
      if (connectionParams.Authorization) {
        formattedJWT = connectionParams.Authorization.slice(7);
      } else if (connectionParams.jwt) {
        formattedJWT = connectionParams.jwt;
      }

      const userPromise = new Promise((res, rej) => {
        if (formattedJWT) {
          jsonwebtoken.verify(formattedJWT, JWT_SECRET, (err, decoded) => {
            if (err) {
              rej(new AuthenticationError("No token"));
            }
            res(GetUserQuery(decoded.id));
          });
        } else {
          rej(new AuthenticationError("No token"));
        }
      });
      return userPromise.then(user => {
        if (user) {
          return { user: Promise.resolve(user) };
        }
        return Promise.reject(new AuthenticationError("No user"));
      });
    }
  },
  ...schema
});

server
  .listen({ port: PORT })
  .then(({ url }) => console.log(`🚀 Server ready at ${url}`));

// The express-jwt middleware checks our Authorization Header for a Bearer token,
// decodes the token using the JWT_SECRET into a JSON object, and then attaches
// that Object to the request as req.user
