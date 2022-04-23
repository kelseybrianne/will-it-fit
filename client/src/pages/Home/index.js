import { useQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import ItemList from '../../components/ItemList';
import { GET_FEED, GET_ME } from '../../utils/queries';
import styles from './Home.module.css';

export default function Home() {
  const { data, error, loading } = useQuery(GET_FEED);
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
    //   import spinner
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container className={styles.feed}>
      <h1
        style={{
          padding: '2rem 0',
          testAlign: 'center',
        }}
      >
        The latest and greatest from people you follow:
      </h1>
      <ItemList items={data?.feed} savedItems={me.me.savedItems}></ItemList>
    </Container>
  );
}
