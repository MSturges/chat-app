const { importSchema } = require("graphql-import");
const merge = require("lodash/merge");

const RootResolvers = merge(
  require("./Scalars/resolvers").resolvers,
  require("./User/resolvers").resolvers,
  require("./ChatGroup/resolvers").resolvers,
  require("./Message/resolvers").resolvers
);

module.exports = {
  typeDefs: importSchema("./schema/rootSchema2.graphql"),
  resolvers: RootResolvers,
  formatError: error => {
    console.log("server error...index.js", error);
    return error;
  },
  formatResponse: response => {
    return response;
  }
};
