import { useEffect, useState } from 'react';
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

import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../../utils/queries';
import { ADD_FOLLOWING, REMOVE_FOLLOWING } from '../../utils/mutations';
import EditProfile from '../../components/EditProfile/EditProfile';
import Followers from '../../components/Followers/Followers';
import Following from '../../components/Following/Following';
import ItemList from '../../components/ItemList';

const Closet = () => {
  let { username } = useParams();
  const [followingState, setFollowingState] = useState('notFollowing');
  const [addFollowing, { loadingAddFollowing, errorAddFollowing }] =
    useMutation(ADD_FOLLOWING);
  const [removeFollowing, { loadingRemoveFollowing, errorRemoveFollowing }] =
    useMutation(REMOVE_FOLLOWING);

  // eslint-disable-next-line no-unused-vars
  // Get data on the closet you're viewing, including followers/following
  const { loading, data } = useQuery(GET_USER, {
    variables: {
      username: username,
    }, 
  }, { fetchPolicy:
    'no-cache' }
  );
  const userData = data?.user || {};
  const followers = userData?.followers;

  const me = auth.getProfile(); // me.data.username
  // if you already follow this user, button should be set at Following at page load.

  useEffect(() => {
    if (followers?.length) {
      for (let i = 0; i < followers?.length; i++) {
        if (followers[i]?._id === me.data._id) {
          setFollowingState('following');

          //  we should exit out of for loop once a match is found
          return;
        }
      }
    }
    return;
  }, [followers, me.data._id]);

  // when user clicks the follower/following button, take an action to add or remove the follow.
  const handleFollowUser = async () => {
    const id = userData?._id;
    if (followingState === 'notFollowing') {
      // if the user isn't following the person we add them as a follower and then set the button to say following.
      await addFollowing({
        variables: { id },
      });
      setFollowingState('following');
      return;
    }

    // when user clicks the following button it removes that person from the users following list. Then sets the button back to 'Follow'
    await removeFollowing({
      variables: { id },
    });
    setFollowingState('notFollowing');
    return;
  };

  const discoverCarousel = document.querySelector('.toggle-discover-carousel');
  const toggleDiscoverCarousel = () => {
    discoverCarousel.style.display === 'none'
      ? (discoverCarousel.style.display = 'block')
      : (discoverCarousel.style.display = 'none');
  };

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
        </div>
        <div className="username-div">
          <div className="border-bottom">
            <h2 className="closet-username">{userData.username}</h2>
            <div className="followers-div">
              <Following />
              <Followers />
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
      <div className="closet">
        <ItemList items={userData.closet} />
      </div>
    </div>
  );
};

export default Closet;
