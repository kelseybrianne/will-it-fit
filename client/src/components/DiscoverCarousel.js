import React from 'react';
import './DiscoverCarousel.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Auth from '../utils/auth';

const DiscoverCarousel = () => {
  return (
    <div className="carousel-container">
      <div className="carousel-inner">
        <div className="track">
          {Auth.loggedIn() ? ( 
            <div className="card-container">
              <div className="card"></div>
            </div>
          ) : images.map(({ img }) => (
            <div className="card-container">
              <img className="card" src={img} />
            </div>
          ))}
          <div className="card-container">
            <div className="card"></div>
          </div>
          <div className="card-container">
            <div className="card"></div>
          </div>
          <div className="card-container">
            <div className="card"></div>
          </div>
        </div>
      </div>
      <div className="nav">
        <button className="prev">
          <ChevronLeftIcon />
        </button>
        <button className="next">
          <ChevronRightIcon />
        </button>
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
      img: require('../assets/images/atikh-bana-_KaMTEmJnxY-unsplash.jpg'),
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
    {
        id: 7,
        img: require('../assets/images/brooke-cagle-Ss3wTFJPAVY-unsplash.jpg'),
      },
  ];

export default DiscoverCarousel;
