const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const { cloudinary } = require('./utils/cloudinary');
// const schema = require('./schemas');
// const graphqlHTTP = require('express-graphql');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.post('/api/upload', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const data = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'ml_default',
    });
    console.log(data.url);
    res.status(200).json(data.url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Something went wrong' });
  }
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
// eslint-disable-next-line no-unused-vars
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
