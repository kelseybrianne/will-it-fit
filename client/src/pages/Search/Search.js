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
import { SEARCH_ITEMS } from '../../utils/queries';
import ItemList from '../../components/ItemList';
import './Search.css'

const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const { loading, data, error } = useQuery(SEARCH_ITEMS, {
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
          {loading ? 'Loading...' : ''}
          {data?.searchItems?.length ? (
            <ItemList items={data.searchItems}></ItemList>
          ) : (
            <Typography>No results found</Typography>
          )}
        </div>
    </>
  );
};

export default Search;
