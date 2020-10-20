const { ApolloError, UserInputError } = require("apollo-server");
const Joi = require("@hapi/joi");

module.exports = async (_, { input }, { models }) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().required(),
    });
    const { value, error } = schema.validate(input, { abortEarly: false });
    if (error) {
      throw new UserInputError(
        "Failed to create a character due to validator error",
        {
          validationErrrors: error.details,
        }
      );
    }
    newUser = await models.User.create(input);
    return newUser;
  } catch (e) {
    throw new ApolloError(e);
  }
};

// module.exports = async (_, { input }, { models }) => {
//   return await models.User.insert({});
// };
