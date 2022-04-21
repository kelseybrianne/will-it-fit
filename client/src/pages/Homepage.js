import { useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import Button from '@mui/material/Button';
import './Closet/Closet.css';
// eslint-disable-next-line no-unused-vars
import Stack from '@mui/material/Stack';
// import profilePic from '../assets/images/ivana-cajina-dnL6ZIpht2s-unsplash.jpg'
// eslint-disable-next-line no-unused-vars
import DiscoverCarousel from '../components/DiscoverCarousel/DiscoverCarousel.js';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import auth from '../utils/auth';

import { useMutation, useQuery } from '@apollo/client';
import { GET_FOLLOWERS, GET_USER } from '../utils/queries';
import ItemList from '../components/ItemList/ItemList.js';
import { Container } from '@mui/material';

const Homepage = ({ windowSize }) => {
  let { username } = useParams();

  // eslint-disable-next-line no-unused-vars
  const { loading, data } = useQuery(GET_USER, {
    variables: {
      username: username,
    },
  });

  const { followers } = useQuery(GET_FOLLOWERS);
  console.log(followers);

  // const [ addFollowing] = useMutation(ADD_FOLLOWING);
  // const [removeFollowing] = useMutation(REMOVE_FOLLOWING);

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
      {/* <Items userData={userData} windowSize={windowSize} /> */}
      <div className="closet">
        <ItemList items={userData.closet} />
      </div>
      <div>
        <h2>
          {userData.following?.length
            ? `Viewing ${userData.following?.length} saved ${
                userData.following?.length === 1 ? 'followers' : 'followers'
              }:`
            : "You don't follow anyone!"}
        </h2>
        {/* <Container>
          {userData.following?.map((following) => {
            return (
              <div key={book.bookId}>
                {folloing.primaryPhoto ? (
                  <img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <div>
                  <h5>{following.username}</h5>
                </div>
              </div>
            );
          })}
        </Container> */}
      </div>
    </div>
  );
};

export default Homepage;
