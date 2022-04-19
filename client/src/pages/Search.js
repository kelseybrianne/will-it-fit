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

const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  // useQuery()
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

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
      <Container></Container>
    </>
  );
};

export default Search;
