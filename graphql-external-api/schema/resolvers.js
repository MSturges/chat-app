import { Group, Message, User } from "../database/connectors";
import GraphQLDate from "graphql-date";
import { withFilter } from "apollo-server";

import { pubsub } from "./subscriptions";
const MESSAGE_ADDED_TOPIC = "messageAdded";

export const resolvers = {
  Date: GraphQLDate,
  PageInfo: {
    // we will have each connection supply its own hasNextPage/hasPreviousPage functions!
    hasNextPage(connection, args) {
      return connection.hasNextPage();
    },
    hasPreviousPage(connection, args) {
      return connection.hasPreviousPage();
    }
  },
  Query: {
    group(_, args) {
      return Group.find({ where: args });
    },
    messages(_, args) {
      return Message.findAll({
        where: args,
        order: [["createdAt", "DESC"]]
      });
    },
    user(_, args) {
      return User.findOne({ where: args });
    }
  },
  Group: {
    users(group) {
      return group.getUsers();
    },
    messages(group, { first, last, before, after }) {
      // base query -- get messages from the right group
      const where = { groupId: group.id };
      // because we return messages from newest -> oldest
      // before actually means newer (id > cursor)
      // after actually means older (id < cursor)
      if (before) {
        // convert base-64 to utf8 id
        where.id = { $gt: Buffer.from(before, "base64").toString() };
      }
      if (after) {
        where.id = { $lt: Buffer.from(after, "base64").toString() };
      }
      return Message.findAll({
        where,
        order: [["id", "DESC"]],
        limit: first || last
      }).then(messages => {
        const edges = messages.map(message => ({
          cursor: Buffer.from(message.id.toString()).toString("base64"), // convert id to cursor
          node: message // the node is the message itself
        }));
        return {
          edges,
          pageInfo: {
            hasNextPage() {
              if (messages.length < (last || first)) {
                return Promise.resolve(false);
              }
              return Message.findOne({
                where: {
                  groupId: group.id,
                  id: {
                    [before ? "$gt" : "$lt"]: messages[messages.length - 1].id
                  }
                },
                order: [["id", "DESC"]]
              }).then(message => !!message);
            },
            hasPreviousPage() {
              return Message.findOne({
                where: {
                  groupId: group.id,
                  id: where.id
                },
                order: [["id"]]
              }).then(message => !!message);
            }
          }
        };
      });
    }
  },
  Mutation: {
    // Whenever a user creates a message, we trigger pubsub to publish the messageAdded event along with the newly created message.
    // pubsubwill emit an event to any clients subscribed to messageAdded and pass them the new message.
    createMessage(_, { text, userId, groupId }) {
      return Message.create({
        userId,
        text,
        groupId
      }).then(message => {
        // publish subscription notification with the whole message
        pubsub.publish(MESSAGE_ADDED_TOPIC, { [MESSAGE_ADDED_TOPIC]: message });
        return message;
      });
    }
  },
  Subscription: {
    messageAdded: {
      // the subscription payload is the message.
      // But we only want to emit this event to clients who care about the message because it
      // was sent to one of their user’s groups! We can modify our implementation to filter who gets the event emission:
      //
      //
      // Using withFilter, we create a filter which returns true when the groupId of a new message matches one of the groupIds passed into our messageAdded subscription.
      // This filter will be applied whenever pubsub.publish(MESSAGE_ADDED_TOPIC, { [MESSAGE_ADDED_TOPIC]: message }) is triggered, and only clients whose subscriptions pass the filter will receive the message.
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_ADDED_TOPIC),
        (payload, args) => {
          return Boolean(
            args.groupIds &&
              ~args.groupIds.indexOf(payload.messageAdded.groupId) &&
              args.userId !== payload.messageAdded.userId // don't send to user creating message
          );
        }
      )
    }
  },
  Message: {
    to(message) {
      return message.getGroup();
    },
    from(message) {
      return message.getUser();
    }
  },
  User: {
    messages(user) {
      return Message.findAll({
        where: { userId: user.id },
        order: [["createdAt", "DESC"]]
      });
    },
    groups(user) {
      return user.getGroups();
    },
    friends(user) {
      return user.getFriends();
    }
  }
};
export default resolvers;
