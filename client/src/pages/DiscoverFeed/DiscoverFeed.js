import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './DiscoverFeed.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Auth from '../../utils/auth';
import images from '../../assets/images.js';
import { Snackbar, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import { useQuery } from '@apollo/client';
import { GET_USERMATCHES } from '../../utils/queries';

const DiscoverFeed = () => {
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

  // const { data: data_me } = useQuery(GET_ME);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const { data: data_users, loading } = useQuery(GET_USERMATCHES);
  if (loading) {
    return (
      <Stack alignItems="center" sx={{ zIndex: 'modal' }}>
        <p>
          <CircularProgress />
        </p>
      </Stack>
    );
  }

  return (
    <div>
      <div className="carousel-div">
        <div className="inner-carousel-div">
          <h2 className="page-header">Discover users you match with</h2>
          <div
            ref={ref}
            className="carousel-container"
            id="responsive-container"
          >
            <div className="carousel-inner">
              <div ref={trackRef} className="track">
                {Auth.loggedIn()
                  ? data_users?.userMatches?.map(
                      ({ primaryPhoto, _id, username }) => (
                        <Link
                          className="discover-profile-hover"
                          to={`/closet/${username}`}
                          key={_id}
                        >
                          <div className="card-container" id="card-container">
                            <img
                              className="card"
                              src={primaryPhoto}
                              alt={username}
                            />
                            <div className="view-on-hover">Follow</div>
                          </div>
                        </Link>
                      )
                    )
                  : images.map(({ id, img }) => (
                      <div
                        key={id}
                        className="card-container cursor-pointer"
                        id="card-container"
                        onClick={handleClick}
                      >
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
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="You must be logged in to view closets"
        action={action}
        className="snackbar"
      />
    </div>
  );
};

export default DiscoverFeed;
