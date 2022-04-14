import React from 'react';
import Button from '@mui/material/Button';
import './Closet.css';
import Items from '../components/Items';
import Stack from '@mui/material/Stack';

const Closet = ({ windowSize }) => {
  return (
    <div className="profile-page">
      <div className="white-div"></div>
      <div className="profile-head">
        <div className="profile-img-div">
          <h2>rsherman</h2>
          <div className="folls-div">
            <a href=""><p>Following</p></a>
            <p>|</p>
            <a href=""><p>Followers</p></a>
          </div>
          {/* toggle 'Following' and 'Follow' on click'*/}
          {/* <button className="unfollow">Following</button> */}
          <Button variant="contained">Follow</Button>
        </div>
      </div>
      <Items windowSize={windowSize} />
    </div>
  );
};

export default Closet;
