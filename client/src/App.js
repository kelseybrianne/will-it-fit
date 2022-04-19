// import Header from "./components/Header";
import { useState, useEffect } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DiscoverFeed from './pages/DiscoverFeed';
import Closet from './pages/Closet';
import { setContext } from '@apollo/client/link/context';
import Search from './pages/Search';

// Construct our main GraphQL API endpoint
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
  const windowSize = useWindowSize();

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<DiscoverFeed />} />
            <Route
              path="/closet"
              element={<Closet windowSize={windowSize} />}
            />
            <Route path="/search" element={<Search />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    // Call handler immediately so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    // return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default App;
