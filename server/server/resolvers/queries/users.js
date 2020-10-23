module.exports = async (_, { skip, limit }, { models }) => {
  return await models.User.find().skip(skip).limit(limit);
};

// module.exports = async (_, {}, { models }) => {
//   return await models.User.find().limit(10);
// };
