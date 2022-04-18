import React from 'react';
import Button from '@mui/material/Button';
import './Closet.css';
import Items from '../components/Items.js';
// eslint-disable-next-line no-unused-vars
import Stack from '@mui/material/Stack';
import UploadForm from '../components/UploadForm';
// import profilePic from '../assets/images/ivana-cajina-dnL6ZIpht2s-unsplash.jpg'
import profilePic from '../assets/images/atikh-bana-_KaMTEmJnxY-unsplash.jpg'

const Closet = ({ windowSize }) => {
  return (
    <div className="profile-page">
      <div className="white-div"></div>
      <div className="profile-head">
        <div className="profile-img-div">
          <img src={profilePic} />
          <h2>rsherman</h2>
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
          <Button variant="contained">Add Item</Button>
          <UploadForm/>
        </div>
      </div>
      <Items windowSize={windowSize} />
    </div>
  );
};

export default Closet;
