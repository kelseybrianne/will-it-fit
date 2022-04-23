import { useQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import ItemList from '../../components/ItemList';
import auth from '../../utils/auth';
import { GET_FAVORITES } from '../../utils/queries';

export default function SavedItems() {
  const me = auth.getProfile();
  const { data, error, loading } = useQuery(GET_FAVORITES, {
    fetchPolicy: 'no-cache', // this is needed to get the latest data
    variables: { id: me.data._id },
  });

  if (error) {
    console.error(error);
    return <Typography>Oops... something didn't fit...</Typography>;
  }

  if (loading) {
    return (
      <Stack alignItems="center" sx={{ zIndex: 'modal' }}>
        <p>
          <CircularProgress />
        </p>
      </Stack>
    );
  }

  return (
    <div>
      <h2 className="page-header">Saved Items</h2>
      <div className="item-list-container">
        <ItemList savedItems={data?.savedItems} items={data?.savedItems}></ItemList>
      </div>
    </div>
    // <Container>
    //   <h1
    //     style={{
    //       padding: '2rem 0',
    //     }}
    //   >
    //     Saved Items
    //   </h1>
    //   <ItemList
    //     items={data?.savedItems}
    //     savedItems={data?.savedItems}
    //   ></ItemList>
    // </Container>
  );
}
