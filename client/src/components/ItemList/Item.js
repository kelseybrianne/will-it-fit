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
import { useMutation } from '@apollo/client';
import { REMOVE_ITEM } from '../../utils/mutations';

  

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

  // *Remove item function *
  const [removeItem] = useMutation(REMOVE_ITEM);
  const deleteItem = async (id) => {
    console.log('🤘', id)
    try {
      await removeItem({
        variables: { id }
      });
      console.log('😢', id)
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
    };

  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
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

  const me = auth.getProfile(); // me.data.username
  if (!user) {
    console.log('no user');
    return <></>;
  }



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
          <FavoriteBorder className="heart-icon icon" />
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
          <MenuItem onClick={() => deleteItem(_id)} > Delete</MenuItem>
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
                ''
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
                <MenuItem onClick={() => deleteItem(_id)} > Delete</MenuItem>
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
