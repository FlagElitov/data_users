const mutations = require("./mutations/index");
const queries = require("./queries/index");

module.exports = {
  Mutation: {
    ...mutations,
  },
  Query: {
    ...queries,
  },
};
