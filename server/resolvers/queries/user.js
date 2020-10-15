module.exports = async (_, { id }, { models }) => {
  return await models.User.findOne({ _id: id });
};
