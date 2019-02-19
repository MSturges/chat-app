import { withFilter } from "apollo-server";
import { pubsub } from "../subscriptions";

import { getAuthenticatedUser, subscriptionLogic } from "../../authLogic";
const CreateMessageQuery = require("../../database/queries/message/CreateMessage");
const GetMessagesQuery = require("../../database/queries/message/getMessages");
const GetChatGroupQuery = require("../../database/queries/chatGroup/getChatGroup");
const GetUserQuery = require("../../database/queries/user/GetUser");

// may want to change this to be unique to the group
// may want to refactor to using redis
const MESSAGE_ADDED_TOPIC = "messageAdded";

export const resolvers = {
  Query: {
    messages(_, { groupId }, ctx) {
      return getAuthenticatedUser(ctx).then(currentUser => {
        // need logic for making sure the person creating the message is part of the group
        return GetMessagesQuery(groupId)
          .then(data => {
            return data.messages;
          })
          .catch(err => {
            console.log("mongo error", err);
          });
      });
    }
  },
  Mutation: {
    createMessage(_, { message, userId, groupId }, ctx) {
      return getAuthenticatedUser(ctx).then(currentUser => {
        // need logic for making sure the person creating the message is the same as the logged in usr
        return CreateMessageQuery({ message, userId, groupId })
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
      });
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        (payload, args, ctx) =>
          pubsub.asyncAuthIterator(
            MESSAGE_ADDED_TOPIC,
            subscriptionLogic.messageAdded(payload, args, ctx)
          ),
        (payload, args, ctx) => {
          return ctx.user.then(currentUser => {
            return Boolean(
              args.groupIds && currentUser.id != payload.messageAdded.from // don't send to user creating message
            );
          });
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
