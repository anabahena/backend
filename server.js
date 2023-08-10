const { GraphQLServer } = require("graphql-yoga"),
  express = require("express"),
  cookieParser = require("cookie-parser"),
  http = require("http"),
  typeDefs = require("./typeDefs"),
  { ApolloServer } = require("apollo-server-express"),
  { ApolloServerPluginDrainHttpServer } = require("apollo-server-core"),
  cors = require("cors"),
  resolvers = require("./resolvers");

// const options = {
//   uploads: {
//     maxFieldSize: 1000000000,
//     maxFileSize: 1000000000,
//   },
//   bodyParserOptions: {
//     limit: "10mb",
//     extended: true,
//   },
//   port: process.env.PORT || 4000,
// };
// const server = new GraphQLServer({
//   typeDefs,
//   resolvers,
// });

// const app = express();
// const httpServer = http.createServer(app);

// const startApolloServer = async (app, httpServer) => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   });

//   await server.start();
//   server.applyMiddleware({ app });
// };

// server.express.use(async (req, res, next) => {
//   next()
// });

// server
//   .start(options)
//   .then(() => {
//     console.log(`Server is running 🚀🚀 on localhost:${options.port}`);
//   })
//   .catch((error) => {
//     console.error("GraphQL Error", error);
//   });

async function startApolloServer() {
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // Mount Apollo middleware here.
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer()