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
  const { loading, data } = useQuery(SEARCH_ITEMS, {
    variables: { keyword: searchParams.get('q') || '' },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

  console.log({ data });

  return (
    <>
      <Container component={'form'} onSubmit={handleSubmit}>
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
          {data
            ? data.searchItems.map((item) => (
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
                  />
                </ImageListItem>
              ))
            : ''}
        </ImageList>
      </Container>
    </>
  );
};

export default Search;
