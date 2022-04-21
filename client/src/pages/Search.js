import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@apollo/client';
import { SEARCH_ITEMS } from '../utils/queries';
import useWindowSize from '../utils/useWindowSize';

const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const windowSize = useWindowSize();
  const { loading, data, error } = useQuery(SEARCH_ITEMS, {
    variables: { keyword: searchParams.get('q') || '' },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

  const calculateColumns = () => {
    if (windowSize.width < 600) {
      return 1;
    }
    if (windowSize.width < 900) {
      return 2;
    }
    return 3;
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
        <ImageList variant="masonry" cols={calculateColumns()} gap={8}>
          {data?.searchItems?.length ? (
            data.searchItems.map((item, index) => (
              <ImageListItem key={item._id}>
                <img
                  src={`${item.photo}?w=248&fit=crop&auto=format&random=${index}`}
                  alt={item.brand + ' ' + item.name + ' size ' + item.size}
                  loading="eager"
                />
                <ImageListItemBar
                  className="item-text"
                  title={item.brand + ' ' + item.name}
                  subtitle={item.category + ' size ' + item.size}
                  position="below"
                  sx={{
                    width: '100%',
                  }}
                />
              </ImageListItem>
            ))
          ) : (
            <Typography>No results found</Typography>
          )}
        </ImageList>
      </Container>
    </>
  );
};

export default Search;
