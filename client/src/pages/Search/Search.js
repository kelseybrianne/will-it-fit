import {
  Container,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@apollo/client';
import './Search.css'
import { SEARCH_ITEMS, GET_ME } from '../../utils/queries';
import ItemList from '../../components/ItemList/';

const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const {
    data: me,
    error: meError,
    loading: meLoading,
  } = useQuery(GET_ME, { fetchPolicy: 'no-cache' });
  const { loading, data, error } = useQuery(SEARCH_ITEMS, {
    fetchPolicy: 'no-cache',
    variables: { keyword: searchParams.get('q') || '' },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

  if (error || meError) {
    console.error(error || meError);
    return (
      <Container>
        <Typography>Oops... something didn't fit...</Typography>
      </Container>
    );
  }

  if (loading || meLoading) {
    return (
      <Stack alignItems="center" sx={{ zIndex: 'modal' }}>
        <p>
          <CircularProgress />
        </p>
      </Stack>
    );
  }

  return (
    <>
      <Container
        component={'form'}
        onSubmit={handleSubmit}
        sx={{
          pt: 3,
          pb: 5,
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
        <h2 className="responsive-header">
          Searching for {searchTerm ? searchTerm : '...'} that fit
        </h2>
      </Container>
      <div className="item-list-container">
        {loading || meLoading ? 'Loading...' : ''}
        {data?.searchItems?.length ? (
          <ItemList
            items={data.searchItems}
            savedItems={me?.me.savedItems}
          ></ItemList>
        ) : (
          <Typography>No results found</Typography>
        )}
      </div>
        {/* <div className="item-list-container">
          {loading ? 'Loading...' : ''}
          {data?.searchItems?.length ? (
            <ItemList items={data.searchItems}></ItemList>
          ) : (
            <Typography>No results found</Typography>
          )}
        </div> */}
    </>
  );
};

export default Search;
