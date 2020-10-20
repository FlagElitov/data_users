const Joi = require("@hapi/joi");
const { ApolloError, UserInputError } = require("apollo-server");

module.exports = async (_, { id, input }, { models }) => {
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
    const userToUpdate = await models.User.findOne({ _id: id });

    if (!userToUpdate)
      throw new ApolloError(`Could not find podcast with id: '${id}'.`, 400);

    Object.keys(input).forEach((value) => {
      userToUpdate[value] = input[value];
    });

    const updatedUser = await userToUpdate.save();

    return updatedUser;
  } catch (e) {
    throw new ApolloError(e);
  }
};

// module.exports = async (_, { id , input}, { models }) => {
//   return await models.User.update( { _id:id} , {input } );;
// };
