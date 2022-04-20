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
          textAlign: windowSize.width > 766 ? 'left' : 'center',
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
        <ImageList
          variant="masonry"
          cols={windowSize.width > 766 ? 3 : 2}
          gap={windowSize.innerWidth > 339 ? 16 : 8}
        >
          {data?.searchItems?.length ? (
            data.searchItems.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  src={item.photo}
                  srcSet={item.photo}
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
