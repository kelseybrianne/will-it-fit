import React from 'react';
import Button from '@mui/material/Button';
import './Closet.css';
import Items from '../components/Items.js';
import profilePic from '../assets/images/atikh-bana-_KaMTEmJnxY-unsplash.jpg';


import { useMutation, useQuery } from '@apollo/client';
import { GET_ME, GET_FOLLOWING } from '../utils/queries';

const Homepage = ({ windowSize }) => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  console.log(userData);

  const { followData} = useQuery(GET_FOLLOWING)
  const following = followData?.me || {}
  console.log(following)


  return (
    <div className="profile-page">
      <div className="white-div"></div>
      <div className="profile-head">
        <div className="profile-img-div">
          <img src={profilePic} />
         
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
        </div>
      </div>
      <Items windowSize={windowSize} />
    </div>
  );
};

export default Homepage;
