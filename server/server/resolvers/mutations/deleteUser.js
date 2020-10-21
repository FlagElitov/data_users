var mongoose = require("mongoose");

module.exports = async (_, { id }, { models }) => {
  // add this inside your route
  const deleteUser = await models.User.deleteOne({ _id: id });

  if (deleteUser.deletedCount) return { id: id };
};

// module.exports = async (_, { id }, { models }) => {
//   return await models.User.remove({ _id: id });
// };y
