import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import Button from '@mui/material/Button';
import './Closet.css';
import Items from '../components/Items.js';
// eslint-disable-next-line no-unused-vars
import Stack from '@mui/material/Stack';
// import profilePic from '../assets/images/ivana-cajina-dnL6ZIpht2s-unsplash.jpg'
// eslint-disable-next-line no-unused-vars
import profilePic from '../assets/images/atikh-bana-_KaMTEmJnxY-unsplash.jpg';
import AddItem from '../components/AddItem';
import DiscoverCarousel from '../components/DiscoverCarousel';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';

const Closet = ({ windowSize }) => {
  let { username } = useParams();

  // eslint-disable-next-line no-unused-vars
  const { loading, data } = useQuery(GET_USER, {
    variables: {
      username: username,
    },
  });

  const discoverCarousel = document.querySelector('.toggle-discover-carousel');
  const toggleDiscoverCarousel = () => {
    discoverCarousel.style.display === 'none'
      ? (discoverCarousel.style.display = 'block')
      : (discoverCarousel.style.display = 'none');
  };

  const userData = data?.user || {};

  return (
    <div className="profile-page">
      <div className="white-div"></div>
      <div className="profile-head">
        <div className="profile-img-div">
          <img src={userData.primaryPhoto} alt={userData.primaryPhoto} />
          {/* <h2>{userData.username}</h2> */}
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
        </div>
        <div className="username-div">
          <h2 className="closet-username">{userData.username}</h2>
          <div className="btns-div">
            <AddItem />
            <Button
              variant="contained"
              className="discover-btn"
              onClick={toggleDiscoverCarousel}
            >
              <PersonAddAltIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="toggle-discover-carousel">
        <DiscoverCarousel />
      </div>
      <Items userData={userData} windowSize={windowSize} />
    </div>
  );
};

export default Closet;
