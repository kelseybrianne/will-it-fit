// import Header from "./components/Header";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  // eslint-disable-next-line no-unused-vars
  createHttpLink,
} from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.js';
import DiscoverFeed from './pages/DiscoverFeed/DiscoverFeed.js';
import Closet from './pages/Closet/Closet';
import { setContext } from '@apollo/client/link/context';
import Search from './pages/Search';
import SavedItems from './pages/SavedItems/index.js';

// Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <Routes>
            <Route path="/discover" element={<DiscoverFeed />} />
            <Route path="/closet/:username" element={<Closet />} />
            <Route path="/search" element={<Search />} />
            <Route path="/saved" element={<SavedItems />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
