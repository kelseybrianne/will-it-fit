import { useQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import ItemList from '../../components/ItemList';
import DiscoverFeed from '../../components/DiscoverCarousel/DiscoverCarousel';
import { GET_FEED, GET_ME } from '../../utils/queries';

import auth from '../../utils/auth';
export default function Home() {
  const { data, error, loading } = useQuery(GET_FEED, {
    fetchPolicy: 'no-cache',
  });
  const {
    data: me,
    error: meError,
    loading: meLoading,
  } = useQuery(GET_ME, { fetchPolicy: 'no-cache' });

  if (error || meError) {
    console.error(error || meError);
    return <Typography>Oops... something didn't fit...</Typography>;
  }

  if (loading || meLoading) {
    if (loading || meLoading) {
      return (
        <Stack alignItems="center" sx={{ zIndex: 'modal' }}>
          <p>
            <CircularProgress />
          </p>
        </Stack>
      );
    }
  }

  // {auth.loggedIn() ? <Home /> : <DiscoverFeed />}

  return (
    <div>
      <h2 className="page-header">
        The latest and greatest from people you follow:
      </h2>
      <div className="item-list-container">
        <ItemList items={data?.feed} savedItems={me.me.savedItems}></ItemList>
      </div>
    </div>
  );
}
