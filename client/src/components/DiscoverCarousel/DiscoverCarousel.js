import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './DiscoverCarousel.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Auth from '../../utils/auth';
import images from '../../assets/images.js';

import { useQuery } from '@apollo/client';
import { GET_USERMATCHES, GET_ME } from '../../utils/queries';

const DiscoverCarousel = () => {
  const ref = useRef();
  const trackRef = useRef();

  const [currentPage, setCurrentPage] = useState(0);
  const [nextHidden, setNextHidden] = useState(false);
  const [prevHidden, setPrevHidden] = useState(true);
  const nextPage = () => {
    let newPage;
    // if width of container is less than 300px, only slide the width of one picture instead of by the width of the entire carousel container
    ref.current.offsetWidth > 300
      ? (newPage = currentPage + ref.current.offsetWidth)
      : (newPage = currentPage + 200);

    trackRef.current.style.transform = `translateX(-${newPage}px`;
    setCurrentPage(newPage);
    // If you've reached the end of the track, hide next button
    trackRef.current.offsetWidth - newPage < ref.current.offsetWidth
      ? setNextHidden(true)
      : setNextHidden(false);

    // if the track has shifted to a new page, show the previous button, otherwise hide it
    newPage ? setPrevHidden(false) : setPrevHidden(true);
  };

  const prevPage = () => {
    let newPage;
    // don't allow currentPage to go below 0
    let newPageIsNotMobile =
      currentPage - ref.current.offsetWidth > 0
        ? currentPage - ref.current.offsetWidth
        : 0;

    ref.current.offsetWidth > 300
      ? (newPage = newPageIsNotMobile)
      : (newPage = currentPage - 200);

    trackRef.current.style.transform = `translateX(-${newPage}px)`;
    setCurrentPage(newPage);

    // If you've reached the end of the track, hide next button
    trackRef.current.offsetWidth - newPage < ref.current.offsetWidth
      ? setNextHidden(true)
      : setNextHidden(false);

    // if the track has shifted to a new page, show the previous button, otherwise hide it
    newPage ? setPrevHidden(false) : setPrevHidden(true);
  };

  const { data: data_me } = useQuery(GET_ME);

  const { data: data_users } = useQuery(GET_USERMATCHES, {
    skip: !data_me,
    variables: {
      height: data_me && data_me.me.height,
      weight: data_me && data_me.me.weight,
    },
  });

  return (
    <div ref={ref} className="carousel-container">
      <div className="carousel-inner">
        <div ref={trackRef} className="track">
          {Auth.loggedIn()
            ? data_users?.userMatches?.map(
                ({ primaryPhoto, _id, username }) => (
                  <Link to={`/closet/${username}`} key={_id}>
                    <div className="card-container">
                      <img className="card" src={primaryPhoto} alt={username} />
                    </div>
                  </Link>
                )
              )
            : images.map(({ id, img }) => (
                <div key={id} className="card-container">
                  <img className="card" src={img} alt="profile-pic" />
                </div>
              ))}
        </div>
      </div>
      <div className="nav">
        {!prevHidden && (
        <button onClick={prevPage} className="prev">
          <ChevronLeftIcon />
        </button>
            )}
            {!nextHidden && (
        <button onClick={nextPage} className="next">
          <ChevronRightIcon />
        </button>
          )}
      </div>
    </div>
  );
};

export default DiscoverCarousel;
