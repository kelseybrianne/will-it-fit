import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';
import DiscoverFeed from './pages/DiscoverFeed';
import Closet from './pages/Closet';

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
  console.log(document.location);

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<DiscoverFeed />} component={DiscoverFeed} />
            <Route path="/closet" element={<Closet />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
