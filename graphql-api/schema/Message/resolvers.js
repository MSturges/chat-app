const CreateMessageQuery = require("../../database/queries/message/CreateMessage");
const GetChatGroupQuery = require("../../database/queries/chatGroup/getChatGroup");
const GetUserQuery = require("../../database/queries/user/GetUser");

export const resolvers = {
  Mutation: {
    createMessage(_, args) {
      return CreateMessageQuery(args)
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    }
  },
  Message: {
    to({ to }) {
      return GetChatGroupQuery(to)
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    },
    from({ from }) {
      return GetUserQuery(from)
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    }
  }
};
