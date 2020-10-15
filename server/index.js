const { ApolloServer } = require("apollo-server");
const connectDb = require("./config/db");
const typeDefs = require("./types/index");
const resolvers = require("./resolvers/index");
const models = require("./models/index");

connectDb();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
// git
BaseAudioContext;
