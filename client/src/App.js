// import Header from "./components/Header";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  // eslint-disable-next-line no-unused-vars
  createHttpLink,
} from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.js';
import DiscoverFeed from './pages/DiscoverFeed/DiscoverFeed.js';
import Closet from './pages/Closet/Closet';
import { setContext } from '@apollo/client/link/context';
// import Router from './components/Router';
import Search from './pages/Search/Search.js';
import SavedItems from './pages/SavedItems/index.js';
import Home from './pages/Home/index.js';
import Footer from './components/Footer/Footer.js';
import auth from './utils/auth.js';

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

  
  if(!auth.loggedIn() && window.location.pathname !== "/") window.location.pathname = "/"

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="body-container">
          <Header />
          {auth.loggedIn() ? (
            <Routes>
              <Route path="/discover" element={<DiscoverFeed />} />
              <Route path="/" element={<Home />} />
              <Route path="/closet/:username" element={<Closet />} />
              <Route path="/search" element={<Search />} />
              <Route path="/saved" element={<SavedItems />} />
              <Route
                path="*"
                element={<h2 className="page-header">Wrong page!</h2>}
              />
            </Routes>
          ) : (
            <Routes>
              <Route path="*" element={<DiscoverFeed />} />
            </Routes>
          )}
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
