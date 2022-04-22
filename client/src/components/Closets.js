import { useQuery } from '@apollo/client';
import { GET_USERCLOSET } from '../utils/queries';
import useWindowSize from '../utils/useWindowSize';
// import Item from './Item';

const Closets = (personId ) => {
  //   const windowSize = useWindowSize();
  const closetData = useQuery(GET_USERCLOSET, {
    variables: { _id: personId },
  });
  console.log(closetData);

 return closetData

};

export default Closets;
