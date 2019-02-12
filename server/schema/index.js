const { importSchema } = require("graphql-import");
// const graphql = require("graphql");
// const { GraphQLSchema } = graphql;
// const merge = require("lodash/merge");
import { mocks } from "./mocks";

module.exports = {
  typeDefs: importSchema("./schema/schema.graphql"),
  mocks
};
