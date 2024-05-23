import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { PORT } from './config/index.js';
import configureModels from './models/index.js';
import { typeDefs, resolvers } from './graphql/index.js';

async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
      const models = await configureModels();
      return { models };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.status(200).send('Hello!').end();
  });

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer();
