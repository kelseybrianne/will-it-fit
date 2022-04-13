import React from 'react';
import Button from '@mui/material/Button';
import './Closet.css';
import Items from '../components/Items';
import Stack from '@mui/material/Stack';

const Closet = () => {
  return (
    <div className="profile-page">
      <div className="white-div"></div>
      <div className="profile-head">
        <div className="profile-img-div">
          <h2>rsherman</h2>
          <div className="folls-div">
            <p>Following</p>
            <p>|</p>
            <p>Followers</p>
          </div>
          {/* toggle 'Following' and 'Follow' on click'*/}
          {/* <button className="unfollow">Following</button> */}
          <Button variant="contained">Following</Button>
        </div>
      </div>
      <Items />
    </div>
  );
};

export default Closet;
