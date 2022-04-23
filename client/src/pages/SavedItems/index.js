import { useQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import ItemList from '../../components/ItemList';
import auth from '../../utils/auth';
import { GET_FAVORITES } from '../../utils/queries';

export default function SavedItems() {
  const me = auth.getProfile();
  const { data, error, loading } = useQuery(GET_FAVORITES, {
    variables: { id: me.data._id },
  });

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <h1
        style={{
          padding: '2rem 0',
        }}
      >
        Saved Items
      </h1>
      <ItemList
        items={data?.savedItems}
        savedItems={data?.savedItems}
      ></ItemList>
    </Container>
  );
}
