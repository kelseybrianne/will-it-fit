import { useQuery } from '@apollo/client';
import auth from '../../utils/auth';
import { GET_FAVORITES } from '../../utils/queries';

export default function SavedItems() {
  const me = auth.getProfile();
  console.log('me.data._id', me.data._id);
  const { data, error, loading } = useQuery(GET_FAVORITES, {
    variables: { id: me.data._id },
  });
  console.log(data);

  return <>Saved Items</>;
}
