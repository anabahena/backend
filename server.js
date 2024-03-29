const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  cache: "bounded",
});

server.listen().then(() => {
  console.log(
    "Corriendo aplicación graphQL en <http://localhost:4000/grapqhql>"
  );
});
