import { useQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import ItemList from '../../components/ItemList';
import { GET_FEED } from '../../utils/queries';
import styles from './Home.module.css'

export default function Home() {
  const { data, error, loading } = useQuery(GET_FEED);

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  if (loading) {
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
      <ItemList items={data?.feed}></ItemList>
    </Container>
  );
}
