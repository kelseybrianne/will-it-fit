import React from 'react';
import './MainFeed.css';

const MainFeed = () => {
  return (
    <div className="profile-page">
      <div className="white-div"></div>
      <div className="profile-head">
        <div className="img-div">
          <h2>rsherman</h2>
          <div className="folls-div">
            <p>Following</p>
            <p>|</p>
            <p>Followers</p>
          </div>
          {/* toggle 'Following' and 'Follow' on click'*/}
          <button 
          className="unfollow">Following</button>
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
