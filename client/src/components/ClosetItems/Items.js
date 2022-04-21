import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ItemModal from './ItemModal.js';
import './Items.css';
import './ItemModal.css';

import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';

const Items = ({ windowSize, userData }) => {
  const { loading, data } = useQuery(GET_ME);
  const me = data?.me || {};

  // handles opening and closing of MUI modal
  console.log(userData);
  const [open, setOpen] = React.useState(false);
  const [modalItemProps, setModalItemProps] = useState({
    _id: '',
    category: '',
    brand: '',
    name: '',
    size: '',
    link: '',
    photo: '',
    review: '',
  });

  const handleOpen = (e) => {
    console.log(e.currentTarget);
    const capitalizeFirstLetter = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    setModalItemProps({
      _id: e.currentTarget.getAttribute('data-id'),
      category: e.currentTarget.getAttribute('data-category'),
      brand: capitalizeFirstLetter(e.currentTarget.getAttribute('data-brand')),
      name: e.currentTarget.getAttribute('data-name'),
      size: e.currentTarget.getAttribute('data-size'),
      link: e.currentTarget.getAttribute('data-link'),
      photo: e.currentTarget.getAttribute('data-photo'),
      review: e.currentTarget.getAttribute('data-review'),
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // more icon that opens edit/delete MUI menu
  const [anchorEl, setAnchorEl] = React.useState(null);
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
  console.log(me.username);
  console.log(userData.username);
  return (
    <div className="closet">
      <ImageList
        variant="masonry"
        cols={windowSize.width > 766 ? 3 : 2}
        gap={window.innerWidth > 339 ? 16 : 8}
      >
        {userData?.closet
          ? userData.closet.map(
              ({
                _id,
                category,
                brand,
                gender,
                name,
                photo,
                review,
                size,
                username,
                link,
              }) => (
                <div key={_id} className="item-list-wrapper cursor-pointer">
                  {/* substitute heart icon for MoreVertIcon when closet does not belong to the person who is logged in */}

                  <div
                    data-id={_id}
                    data-category={category}
                    data-brand={brand}
                    data-name={name}
                    data-size={size}
                    data-link={link}
                    data-photo={photo}
                    data-review={review}
                    type="button"
                    onClick={handleOpen}
                  >
                    <ImageListItem>
                      {userData.username === me.username ? (
                        <MoreVertIcon
                          id="basic-button"
                          aria-controls={openMenu ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={openMenu ? 'true' : undefined}
                          onClick={handleClick}
                          className="more-icon icon"
                        />
                      ) : (
                        <FavoriteBorderIcon className="heart-icon icon" />
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
                  </div>
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
                        <img src={modalItemProps.photo} alt="img" />
                      </div>
                      <div className="item-modal-text">
                        <div className="item-name-more-div">
                          <h1>{modalItemProps.name}</h1>
                          <MoreVertIcon
                            id="basic-button"
                            aria-controls={openMenu ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMenu ? 'true' : undefined}
                            onClick={handleClick}
                            className="icon-p"
                          />
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
                            <MenuItem onClick={handleCloseMenu}>
                              Delete
                            </MenuItem>
                          </Menu>
                        </div>
                        <p className="item-desc">{`${modalItemProps.brand} ${modalItemProps.category}`}</p>
                        <p className="item-desc">Size: {modalItemProps.size}</p>
                        <a
                          href={modalItemProps.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button className="shop-btn" variant="contained">
                            Shop
                          </Button>
                        </a>
                        <div className="review-div">
                          <div className="review-header">
                            <div className="avatar-pic-div">
                              <img src={userData?.primaryPhoto} alt="img-alt" />
                            </div>
                            <div className="username-div-modal">
                              <Link to={`/closet/${userData.username}`}>
                                <p className="username">{userData.username}</p>
                              </Link>
                              <p className="user-measurements-displayed">
                                {userData.height}" | {userData.weight}lbs
                              </p>
                            </div>
                          </div>
                          <p className="review-content">
                            {modalItemProps.review}
                          </p>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </div>
              )
            )
          : ''}
      </ImageList>
    </div>
  );
};

const BackdropUnstyled = React.forwardRef((props, ref) => {
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

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: .5;
`;

const style = (theme) => ({
  width: 900,
  bgcolor: theme.palette.mode === 'dark' ? '#0A1929' : '#f1f1f1',
  border: 'none',
  overflow: 'auto',
});

export default Items;