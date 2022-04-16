import Header from '../components/Header';
import React, { useState } from 'react';
import './DiscoverFeed.css';

import { useMutation, useQuery } from '@apollo/client';
import { GET_USERMATCHES } from '../utils/queries';

let viewClosetEl = document.querySelector('.view-closet');
let imgDivEl = document.querySelector('.img-div');

const DiscoverFeed = () => {
  const { loading, data } = useQuery(GET_USERMATCHES, {
    variables: { height: 70, weight: 140 }
  });
console.log(data);
  const userMatches = data?.userMatches || [];
  console.log(userMatches);

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
          {userMatches.map(({ _id, primaryPhoto }) => (
            <div
              className={
                _id % 2 === 0 ? 'img-div-even img-div' : 'img-div-odd img-div'
              }
            >
              <img key={_id} alt="cool-pic" src={primaryPhoto} className="img" />
              <p className="view-closet">View Closet</p>
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
