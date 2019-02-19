import { withFilter } from "apollo-server";
import { pubsub } from "../subscriptions";

const CreateMessageQuery = require("../../database/queries/message/CreateMessage");
const GetMessagesQuery = require("../../database/queries/message/getMessages");
const GetChatGroupQuery = require("../../database/queries/chatGroup/getChatGroup");
const GetUserQuery = require("../../database/queries/user/GetUser");

// may want to change this to be unique to the group
// may want to refactor to using redis
const MESSAGE_ADDED_TOPIC = "messageAdded";

export const resolvers = {
  Query: {
    messages(_, { groupId }) {
      return GetMessagesQuery(groupId)
        .then(data => {
          return data.messages;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    }
  },
  Mutation: {
    createMessage(_, args) {
      return CreateMessageQuery(args)
        .then(data => {
          // publish the message to our pupsub
          pubsub.publish(MESSAGE_ADDED_TOPIC, {
            [MESSAGE_ADDED_TOPIC]: data
          });
          return data;
        })
        .catch(err => {
          console.log("mongo error", err);
        });
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_ADDED_TOPIC),
        (payload, args) => {
          // user is subscribed, check if user needs data
          return Boolean(
            args.userId != payload.messageAdded.from // don't send to user creating message
          );
        }
      )
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
