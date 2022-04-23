
import { useQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import ItemList from '../../components/ItemList';
import { GET_FEED } from '../../utils/queries';

import Auth from '../../utils/auth';
import DiscoverCarousel from '../../components/DiscoverCarousel/DiscoverCarousel';

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
   {(Auth.loggedIn()) ? <Container>
        <h1
          style={{
            padding: '2rem 0',
            testAlign: 'center',
          }}
        >
          The latest and greatest from people you follow:
        </h1>
        <ItemList items={data?.feed}></ItemList>
      </Container> :
    <DiscoverCarousel/> 
  }
    );
   }

  // if (!loggedIn)
  //   return (
  //     <div className="carousel-div">
  //       <div className="inner-carousel-div">
  //         <div className="carousel-container" id="responsive-container">
  //           <div className="carousel-inner"></div>
  //         </div>
  //         <div className="nav">
  //           <button className="prev">
  //             {/* <ChevronLeftIcon onClick={} /> */}
  //           </button>
  //           <button className="next">
  //             {/* <ChevronRightIcon onClick={nextPage} /> */}
  //           </button>
  //         </div>
  //       </div>
  //     </div>
    // );

