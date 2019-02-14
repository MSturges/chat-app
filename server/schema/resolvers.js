import { Group, Message, User } from "../database/connectors";
import GraphQLDate from "graphql-date";

export const resolvers = {
  Date: GraphQLDate,
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
    messages(group) {
      return Message.findAll({
        where: { groupId: group.id },
        order: [["createdAt", "DESC"]]
      });
    }
  },
  Mutation: {
    createMessage(_, { text, userId, groupId }) {
      return Message.create({
        userId,
        text,
        groupId,
      });
    },
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
