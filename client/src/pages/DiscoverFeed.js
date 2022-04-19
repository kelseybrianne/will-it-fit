import React from 'react';
import { Link } from 'react-router-dom';
import './DiscoverFeed.css';
import Auth from '../utils/auth';

import { useQuery } from '@apollo/client';
import { GET_USERMATCHES, GET_ME } from '../utils/queries';

// let viewClosetEl = document.querySelector('.view-closet');
// let imgDivEl = document.querySelector('.img-div');

const DiscoverFeed = () => {
  // Get logged in user data so you can use the weight and height to get matching users data.
  const { data: data_me } = useQuery(GET_ME);
  console.log(data_me?.me.height);

  const { data: data_users } = useQuery(GET_USERMATCHES, {
    skip: !data_me,
    variables: {
      height: data_me && data_me.me.height,
      weight: data_me && data_me.me.weight,
    },
  });

  console.log(data_users);
  console.log(data_users?.userMatches);

  // const [hover, setHover] = useState('false');

  // if (imgDivEl) {
  //   imgDivEl.addEventListener('mouseover', function (e) {
  //     setHover('true');
  //     viewClosetEl.style.top = e.pageY + 'px';
  //     viewClosetEl.style.left = e.pageX + 'px';
  //     viewClosetEl.style.display = 'block';
  //   });
  // }

  // window.addEventListener('mousemove', cursor);

  // function cursor(e) {
  //   if (hover) {
  //     viewClosetEl.style.top = e.pageY + 'px';
  //     viewClosetEl.style.left = e.pageX + 'px';
  //     viewClosetEl.style.display = 'block';
  //   } else {
  //     viewClosetEl.style.display = 'none';
  //   }
  // }

  return (
    <div className="discover-feed-container">
      {/* <p className="view-closet">View Closet</p> */}
      <div className="discover-container">
        <div className="second-wrapper">
          {Auth.loggedIn()
            ? data_users?.userMatches?.map(
                ({ primaryPhoto, _id, username }) => (
                  <Link to={`/closet/${username}`}>
                  <div
                    key={_id}
                    data-username={username}
                    className={
                      _id % 2 === 0
                        ? 'img-div-even img-div'
                        : 'img-div-odd img-div'
                    }
                  >
                    <img alt="cool-pic" src={primaryPhoto} className="img" />
                    <p className="view-closet">View Closet</p>
                  </div>
                  </Link>
                )
              )
            : images.map(({ id, img }) => (
                <div key={id} className="img-div">
                  <img alt="cool-pic" src={img} className="img" />
                  {/* <p className="view-closet">View Closet</p> */}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

const images = [
  {
    id: 1,
    img: require('../assets/images/rayul-_M6gy9oHgII-unsplash.jpg'),
  },
  {
    id: 2,
    img: require('../assets/images/brooke-cagle-Ss3wTFJPAVY-unsplash.jpg'),
  },
  {
    id: 3,
    img: require('../assets/images/ivana-cajina-dnL6ZIpht2s-unsplash.jpg'),
  },
  {
    id: 4,
    img: require('../assets/images/daniel-monteiro-VMeHP3mNJL4-unsplash.jpg'),
  },
  {
    id: 5,
    img: require('../assets/images/dom-hill-nimElTcTNyY-unsplash.jpg'),
  },
  {
    id: 6,
    img: require('../assets/images/huston-wilson-WyDr1KFS23Y-unsplash.jpg'),
  },
];

export default DiscoverFeed;
