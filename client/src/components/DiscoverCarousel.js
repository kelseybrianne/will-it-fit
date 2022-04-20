import React from 'react';
import './DiscoverCarousel.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DiscoverCarousel = () => {
  return (
    <div className="carousel-container">
      <div className="carousel-inner">
        <div className="track">
          <div className="card-container">
            <div className="card"></div>
          </div>
          <div className="card-container">
            <div className="card"></div>
          </div>
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

export default DiscoverCarousel;
