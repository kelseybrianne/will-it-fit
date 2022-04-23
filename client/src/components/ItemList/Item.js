import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ModalUnstyled } from '@mui/base';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import MoreVert from '@mui/icons-material/MoreVert';
import {
  Box,
  Button,
  ImageListItem,
  ImageListItemBar,
  Menu,
  MenuItem,
} from '@mui/material';
import { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../utils/auth';
import ToggleHeartIcons from './ToggleHeartIcons';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../utils/mutations';

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackdropUnstyled = forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
`;

const style = (theme) => ({
  width: 900,
  bgcolor: theme.palette.mode === 'dark' ? '#0A1929' : '#f1f1f1',
  border: 'none',
  overflow: 'auto',
});

export default function Item({ item }) {
  // deconstruct the item object
  const {
    _id,
    category,
    brand,
    name,
    photo,
    review,
    size,
    link,
    user,
    height,
    weight,
  } = item;
  // get the currently logged in user from the token cookie
  const me = auth.getProfile(); // me.data.username

  // Gets the current user's saved items
  const { data: userData } = useQuery(GET_ME);

  // sets the saved state based on whether it is in the array or not
  let savedItems = userData.me.savedItems.map((item) => item._id);
  const [saved, setSaved] = useState(savedItems.indexOf(item._id) >= 0);

  // state for the modal being open or not
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
    console.log('Modal opened');
  };
  const handleClose = () => setOpen(false);

  // more icon that opens edit/delete MUI menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  // function for toggling saved
  const [addFavorite] = useMutation(ADD_FAVORITE, { variables: { id: _id } });
  const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
    variables: { id: _id },
  });
  const toggleHeartIcon = (e) => {
    // console.log('Heart toggled');
    if (saved) {
      removeFavorite();
    } else {
      addFavorite();
    }
    setSaved(!saved);
  };

  return (
    <div key={_id} className="item-list-wrapper cursor-pointer">
      {/* substitute heart icon for MoreVertIcon when closet does not belong to the person who is logged in */}

      <ImageListItem onClick={handleOpen}>
        {me.data.username === user.username ? ( // need to check if it's the currently logged in user's item
          <MoreVert
            id="basic-button"
            aria-controls={openMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClick}
            className="more-icon icon"
          />
        ) : (
          // TOGGLE IMAGES
          // <FavoriteBorder className="heart-icon icon" />
          <ToggleHeartIcons saved={saved} toggleHeartIcon={toggleHeartIcon} />
        )}

        <Menu
          id="basic-menu"
          elevation={0}
          className="dropdown-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
        </Menu>
        <img
          src={`${photo}?w=248&fit=crop&auto=format`}
          srcSet={`${photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt="alt goes here"
          loading="lazy"
          className="item-img"
        />
        <ImageListItemBar
          className="item-text"
          title={name}
          subtitle={`${brand} ${category}`}
          position="below"
        />
      </ImageListItem>

      {/* modularizing the item modal is currently not working */}
      {/* <ItemModal /> */}
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style} className="modal-box">
          <div className="item-modal-pic">
            <img src={photo} alt="img" />
          </div>
          <div className="item-modal-text">
            <div className="item-name-more-div">
              <h1>{name}</h1>
              {me.data.username === user.username ? (
                <MoreVert
                  id="basic-button"
                  aria-controls={openMenu ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? 'true' : undefined}
                  onClick={handleClick}
                  className="icon-p"
                />
              ) : (
                <FavoriteBorder className="icon-p icon heart-icon" />
              )}
              <Menu
                id="basic-menu"
                elevation={0}
                className="dropdown-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
              </Menu>
            </div>
            <p className="item-desc">{`${brand} ${category}`}</p>
            <p className="item-desc">Size: {size}</p>
            <a href={link} target="_blank" rel="noreferrer">
              <Button className="shop-btn" variant="contained">
                Shop
              </Button>
            </a>
            <div className="review-div">
              <div className="review-header">
                <div className="avatar-pic-div">
                  <img src={user.primaryPhoto} alt="img-alt" />
                </div>
                <div className="username-div-modal">
                  <Link to={`/closet/${user.username}`}>
                    <p className="username">{user.username}</p>
                  </Link>
                  <p className="user-measurements-displayed">
                    {height}" | {weight}lbs
                  </p>
                </div>
              </div>
              <p className="review-content">{review}</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
