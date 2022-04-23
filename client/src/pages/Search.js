import {
  Container,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@apollo/client';
import { SEARCH_ITEMS, GET_ME } from '../utils/queries';
import ItemList from '../components/ItemList/';

const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const { data: me } = useQuery(GET_ME, { fetchPolicy: 'no-cache' });
  const { loading, data, error } = useQuery(SEARCH_ITEMS, {
    fetchPolicy: 'no-cache',
    variables: { keyword: searchParams.get('q') || '' },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

  if (error) {
    return (
      <Container>
        <Typography>{error.message}</Typography>
      </Container>
    );
  }

  return (
    <>
      <Container
        component={'form'}
        onSubmit={handleSubmit}
        sx={{
          pb: 2,
          display: 'grid',
          textAlign: 'center',
        }}
      >
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            margin: 'auto',
            borderRadius: '2px',
          }}
        />
        <Typography variant="h2">
          Searching for {searchTerm ? searchTerm : '...'} that fit
        </Typography>
      </Container>
      <Container>
        {loading ? 'Loading...' : ''}
        {data?.searchItems?.length ? (
          <ItemList
            items={data.searchItems}
            savedItems={me?.me.savedItems}
          ></ItemList>
        ) : (
          <Typography>No results found</Typography>
        )}
      </Container>
    </>
  );
};

export default Search;
