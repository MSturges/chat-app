const { importSchema } = require("graphql-import");

const merge = require("lodash/merge");

const { resolvers } = require("./resolvers");

module.exports = {
  typeDefs: importSchema("./schema/schema.graphql"),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    // console.log("response data", response.data);
    return response;
  }
};
