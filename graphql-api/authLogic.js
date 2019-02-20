import {
  ApolloError,
  AuthenticationError,
  ForbiddenError
} from "apollo-server";

// reusable function to check for a user with context
export const getAuthenticatedUser = function(ctx) {
  return ctx.user.then(user => {
    if (!user) {
      throw new AuthenticationError("Unauthenticated");
    }
    return user;
  });
};

export const subscriptionLogic = {
  messageAdded(payload, args, ctx) {
    return getAuthenticatedUser(ctx).then(user => {
      // add logic to make sure user is allowed to subscribe to group messages

      // console.log("user", user.chatGroups);
      // console.log("args", args.groupIds);
      //
      //
      // user.chatGroups.forEach(group => {
      //   console.log("group", group);
      // });

      // return true;

      return Promise.resolve();

      //
      // return user
      //   .getGroups({
      //     where: { id: { $in: args.groupIds } },
      //     attributes: ["id"]
      //   })
      //   .then(groups => {
      //     // user attempted to subscribe to some groups without access
      //     if (args.groupIds.length > groups.length) {
      //       throw new ForbiddenError("Unauthorized");
      //     }
      //   });
      //
      //
    });
  }
};
