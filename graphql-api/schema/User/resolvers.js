const CreateUserQuery = require("../../database/queries/user/CreateUser");
const GetUserQuery = require("../../database/queries/user/getUser");
const getChatGoupsQuery = require("../../database/queries/chatGroup/getChatGoups");

export const resolvers = {
  Query: {
    user(_, { userId }) {
      return GetUserQuery(userId)
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    }
  },
  Mutation: {
    createUser(_, args) {
      return CreateUserQuery(args)
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    }
  },
  User: {
    chatGroups({ chatGroups }) {
      return getChatGoupsQuery(chatGroups)
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    }
  }
};
