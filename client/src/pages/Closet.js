import React from 'react';
// import Button from '@mui/material/Button';
import './Closet.css';
import Items from '../components/Items.js';
// eslint-disable-next-line no-unused-vars
import Stack from '@mui/material/Stack';
// import profilePic from '../assets/images/ivana-cajina-dnL6ZIpht2s-unsplash.jpg'
import profilePic from '../assets/images/atikh-bana-_KaMTEmJnxY-unsplash.jpg'
import AddItem from '../components/AddItem';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Closet = ({ windowSize }) => {
  // eslint-disable-next-line no-unused-vars
  const { loading, data } = useQuery(GET_ME);

  const userData = data?.me || {};

  return (
    <div className="profile-page">
      <div className="white-div"></div>
      <div className="profile-head">
        <div className="profile-img-div">
          <img src={profilePic} alt={profilePic}/>
          <h2>rsherman</h2>
          <div className="folls-div">
            <a href="tbd">
              <p>Following</p>
            </a>
            <p>|</p>
            <a href="tbd">
              <p>Followers</p>
            </a>
          </div>
          {/* toggle 'Following' and 'Follow' on click'*/}
          {/* <button className="unfollow">Following</button> */}
          <AddItem />
        </div>
      </div>
      <Items windowSize={windowSize} />
    </div>
  );
};

export default Closet;
