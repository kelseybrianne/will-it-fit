import { useState } from 'react';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import Button from '@mui/material/Button';
import './Closet.css';
// eslint-disable-next-line no-unused-vars
import Stack from '@mui/material/Stack';
// eslint-disable-next-line no-unused-vars
import AddItem from '../../components/AddItem/index.js';
import DiscoverCarousel from '../../components/DiscoverCarousel/DiscoverCarousel.js';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import placeholderProfilePic from '../../assets/images/mukuko-studio-mU88MlEFcoU-unsplash.jpg';
import auth from '../../utils/auth';

import { useQuery } from '@apollo/client';
import { GET_USER } from '../../utils/queries';
import EditProfile from '../../components/EditProfile/EditProfile';
import ItemList from '../../components/ItemList';

const Closet = () => {
  let { username } = useParams();
  const [followingState, setFollowingState] = useState('notFollowing');

  const handleFollowUser = () => {
    followingState === 'notFollowing'
      ? setFollowingState('following')
      : setFollowingState('notFollowing');
  };

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
  const me = auth.getProfile(); // me.data.username

  return (
    <div className="profile-page">
      <div className="white-div"></div>
      <div className="profile-head">
        <div className="profile-img-div">
          <img
            src={
              userData.primaryPhoto
                ? userData.primaryPhoto
                : placeholderProfilePic
            }
            alt={userData.primaryPhoto}
          />
          <div className="folls-div">
            <a href="tbd">
              <p>Following</p>
            </a>
            <p>|</p>
            {/* <p
              className="cursor-pointer discover-btn"
              onClick={toggleDiscoverCarousel}
            >
              <PersonAddAltIcon style={{ fontSize: 16 }} />
            </p>
            <p>|</p> */}
            <a href="tbd">
              <p>Followers</p>
            </a>
          </div>
        </div>
        <div className="username-div">
          <div className="border-bottom">
            <h2 className="closet-username">{userData.username}</h2>
            <div className="followers-div">
              <a href="tbd">
                <p>Following</p>
              </a>

              <p>|</p>
              <a href="tbd">
                <p>Followers</p>
              </a>
            </div>
          </div>
          {/* If closet does not belong to the person logged in,return a 'Follow/Following' button instead of the Add Item, Discover, and Edit Profile buttons*/}
          {me.data.username === username ? (
            <div className="btns-div">
              <AddItem />
              <Button
                variant="contained"
                className="discover-btn"
                onClick={toggleDiscoverCarousel}
              >
                <PersonAddAltIcon style={{ fontSize: 16 }} />
              </Button>
              <EditProfile />
            </div>
          ) : (
            <div className="btns-div">
              <Button
                variant="contained"
                className={
                  followingState === 'following' ? 'following-btn' : ''
                }
                onClick={handleFollowUser}
              >
                {followingState === 'notFollowing' ? 'Follow' : 'Following'}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="toggle-discover-carousel">
        <DiscoverCarousel />
      </div>
      <div className="item-list-container">
        <ItemList items={userData.closet} />
      </div>
    </div>
  );
};

export default Closet;
