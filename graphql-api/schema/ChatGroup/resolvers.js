const CreateGroupQuery = require("../../database/queries/chatGroup/CreateChatGroup");
const GetGroupQuery = require("../../database/queries/chatGroup/getChatGroup");

const GetUsersQuery = require("../../database/queries/user/getUsers");

export const resolvers = {
  Query: {
    chatGroup(_, { id }) {
      return GetGroupQuery(id)
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    }
  },
  Mutation: {
    createChatGroup(_, { group }) {
      return CreateGroupQuery(group)
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    }
  },
  ChatGroup: {
    users({ users }) {
      return GetUsersQuery(users)
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    },
    messages(args) {
      console.log("args", args);
      return [];
    }
  }
};
