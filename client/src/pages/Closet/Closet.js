import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// eslint-disable-next-line no-unused-vars
import Button from '@mui/material/Button';
import './Closet.css';
// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation } from '@apollo/client';
// eslint-disable-next-line no-unused-vars
// imports from local
import AddItem from '../../components/AddItem/index.js';
import DiscoverCarousel from '../../components/DiscoverCarousel/DiscoverCarousel.js';
import placeholderProfilePic from '../../assets/images/mukuko-studio-mU88MlEFcoU-unsplash.jpg';
import auth from '../../utils/auth';
import { GET_USER } from '../../utils/queries';
import { ADD_FOLLOWING, REMOVE_FOLLOWING } from '../../utils/mutations';
import EditProfile from '../../components/EditProfile/EditProfile';
import Followers from '../../components/Followers/Followers';
import Following from '../../components/Following/Following';
import ItemList from '../../components/ItemList';

const Closet = () => {
  let { username } = useParams();

  // state used to toggle discover carousel
  const [isHidden, setIsHidden] = useState(true);

  const [followingState, setFollowingState] = useState('notFollowing');
  const [addFollowing, { loadingAddFollowing, errorAddFollowing }] =
    useMutation(ADD_FOLLOWING, { refetchQueries: [GET_USER] });
  const [removeFollowing, { loadingRemoveFollowing, errorRemoveFollowing }] =
    useMutation(REMOVE_FOLLOWING, { refetchQueries: [GET_USER] });

  // eslint-disable-next-line no-unused-vars
  // Get data on the closet you're viewing, including followers/following
  const { loading, data } = useQuery(
    GET_USER,
    {
      variables: {
        username: username,
      },
    },
    { fetchPolicy: 'no-cache' }
  );

  const userData = data?.user || {};
  const followers = userData?.followers;

  const me = auth.getProfile(); // me.data.username

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

  if (loading || loadingAddFollowing || loadingRemoveFollowing) {
    return (
      <Stack alignItems="center" sx={{ zIndex: 'modal' }}>
        <p>
          <CircularProgress />
        </p>
      </Stack>
    );
  }

  const toggleDiscoverCarousel = () => {
    isHidden ? setIsHidden(false) : setIsHidden(true);
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
            <div className="btns-div ">
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
      {!isHidden && <DiscoverCarousel />}
      <div className="item-list-container">
        <ItemList items={userData.closet} />
      </div>
    </div>
  );
};

export default Closet;
