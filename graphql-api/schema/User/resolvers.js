import { ForbiddenError } from "apollo-server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getAuthenticatedUser } from "../../authLogic";
import { JWT_SECRET } from "../../config";
const CreateUserQuery = require("../../database/queries/user/CreateUser");
const GetUserQuery = require("../../database/queries/user/getUser");
const getChatGoupsQuery = require("../../database/queries/chatGroup/getChatGoups");
const GetUserByEmailQuery = require("../../database/queries/user/getUserByEmail");

export const resolvers = {
  Query: {
    user(_, { userId }, ctx) {
      return getAuthenticatedUser(ctx).then(currentUser => {
        if (currentUser.id !== userId) {
          throw new ForbiddenError("Unauthorized");
        }
        return GetUserQuery(userId)
          .then(data => {
            return data;
          })
          .catch(err => {
            console.log("mongo error", err);
          });
      });
    }
  },
  Mutation: {
    signup(_, { email, password, username }, ctx) {
      // find user by email
      return GetUserByEmailQuery(email).then(existing => {
        // don't create user if already exist
        if (!existing) {
          // hash password and create user
          return bcrypt
            .hash(password, 10)
            .then(hash => {
              // new user object with hash password
              let newUser = {
                email,
                username,
                password: hash,
                jwtVersion: 1
              };
              return CreateUserQuery(newUser).then(data => {
                return data;
              });
            })
            .then(user => {
              const { id, jwtVersion } = user;
              const token = jwt.sign(
                { id, email, version: jwtVersion },
                JWT_SECRET
              );
              user.jwt = token;
              ctx.user = Promise.resolve(user);
              return user;
            });
        }
        return Promise.reject("email already exists"); // email already exists
      });
    },
    login(_, { email, password }, ctx) {
      // find user by email
      return GetUserByEmailQuery(email).then(user => {
        if (user) {
          // validate password
          return bcrypt.compare(password, user.password).then(res => {
            if (res) {
              // create jwt
              const token = jwt.sign(
                {
                  id: user.id,
                  email: user.email,
                  version: user.jwtVersion
                },
                JWT_SECRET
              );
              user.jwt = token;
              ctx.user = Promise.resolve(user);
              return user;
            }
            return Promise.reject("password incorrect");
          });
        }
        return Promise.reject("email not found");
      });
    }
  },
  User: {
    chatGroups(user, args, ctx) {
      return getChatGoupsQuery(user.chatGroups)
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    }
  }
};
