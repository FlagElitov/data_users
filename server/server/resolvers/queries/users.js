module.exports = async (_, {}, { models }) => {
  return await models.User.find().limit(10);
};

// module.exports = async (_, {}, { models }) => {
//   return await models.User.find().limit(10);
// };
