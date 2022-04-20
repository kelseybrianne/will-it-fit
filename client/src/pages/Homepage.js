import React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './Closet.css';
import HomepageItems from '../components/HomepageItems';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Homepage = ({ windowSize }) => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  console.log(userData);

  const [follow, setFollow] = React.useState(false);

  return (
    <div className="profile-page">
      <div className="profile-head">
        <IconButton
          value="check"
          selected={follow}
          onChange={() => {
            setFollow(!follow);
          }}
        >
          <FavoriteIcon className="unfollow" />
        </IconButton>
        {/* toggle 'Following' and 'Follow' on click'*/}
        {/* <button className="unfollow">Following</button> */}
      </div>
      <HomepageItems windowSize={windowSize} />
    </div>
  );
};

export default Homepage;
