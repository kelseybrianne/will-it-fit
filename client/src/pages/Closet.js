import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Closet.css';
import Items from '../components/Items.js';
// eslint-disable-next-line no-unused-vars
import Stack from '@mui/material/Stack';
// import profilePic from '../assets/images/ivana-cajina-dnL6ZIpht2s-unsplash.jpg'
import profilePic from '../assets/images/atikh-bana-_KaMTEmJnxY-unsplash.jpg';
import AddItem from '../components/AddItem';
import DiscoverCarousel from '../components/DiscoverCarousel';

import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';

const Closet = ({ windowSize }) => {
  let { username } = useParams();

  const { loading, data } = useQuery(GET_USER, {
    variables: {
      username: username
    },
  });

  const userData = data?.user || {};
  console.log(userData);

  return (
    <div className="profile-page">
      <div className="white-div"></div>
      <div className="profile-head">
        <div className="profile-img-div">
          <img src={userData.primaryPhoto} />
          <h2>{userData.username}</h2>
          <div className="folls-div">
            <a href="">
              <p>Following</p>
            </a>
            <p>|</p>
            <a href="">
              <p>Followers</p>
            </a>
          </div>
          {/* toggle 'Following' and 'Follow' on click'*/}
          {/* <button className="unfollow">Following</button> */}
          <AddItem />
        </div>
      </div>
      <DiscoverCarousel />
      <Items userData={userData} windowSize={windowSize} />
    </div>
  );
};

export default Closet;
