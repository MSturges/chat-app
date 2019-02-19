const CreateGroupQuery = require("../../database/queries/chatGroup/CreateChatGroup");
const GetGroupQuery = require("../../database/queries/chatGroup/getChatGroup");
const GetUsersQuery = require("../../database/queries/user/getUsers");
const GetMessagesQuery = require("../../database/queries/message/getMessages");
import { getAuthenticatedUser } from "../../authLogic";

export const resolvers = {
  Query: {
    chatGroup(_, { id }, ctx) {
      return getAuthenticatedUser(ctx).then(currentUser => {
        // need logic for checking if currentUser is apart of the group
        return GetGroupQuery(id)
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
    createChatGroup(
      _,
      {
        group: { name, userIds }
      },
      ctx
    ) {
      return getAuthenticatedUser(ctx).then(currentUser => {
        // need logic for checking if currentUser is apart of the chatGroup users
        return CreateGroupQuery({ name, userIds })
          .then(data => {
            return data;
          })
          .catch(err => {
            console.log("mongo error", err);
          });
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
    messages({ _id }) {
      return GetMessagesQuery(_id)
        .then(data => {
          return data.messages;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    }
  }
};
