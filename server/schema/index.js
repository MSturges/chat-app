const { importSchema } = require("graphql-import");

const merge = require("lodash/merge");

const { resolvers } = require("./resolvers");

module.exports = {
  typeDefs: importSchema("./schema/schema.graphql"),
  resolvers
};
