const { GraphQLServer } = require("graphql-yoga"),
  express = require("express"),
  cookieParser = require("cookie-parser"),
  useragent = require("express-useragent"),
  typeDefs = require("./typeDefs"),
  resolvers = require("./resolvers");

const sockets = new Map();
(options = {
  uploads: {
    maxFieldSize: 1000000000,
    maxFileSize: 1000000000,
  },
  bodyParserOptions: {
    limit: "10mb",
    extended: true,
  },
  port: process.env.PORT || 4000,
}),
  (server = new GraphQLServer({
    typeDefs,
    resolvers,
  }));

server.express.set("trust proxy", true);

server.express.use(useragent.express());

server.express.use(cookieParser());

server.express.use(express.json());

server.express.use(async (req, res, next) => {
  next();
});

server
  .start(options)
  .then(() => {
    console.log(`Server is running 🚀🚀 on localhost:${options.port}`);
  })
  .catch((error) => {
    console.error("GraphQL Error", error);
  });

module.exports = server;
