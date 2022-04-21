import * as React from 'react';
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
// import ItemModal from './ItemModal.js';

import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_ME } from '../utils/queries';
import { ADD_FOLLOWING, REMOVE_FOLLOWING } from '../utils/mutations';

const HomepageItems = ({ windowSize }) => {
  // handles opening and closing of MUI modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { loading, data } = useQuery(GET_ME);

  const userData = data?.me || {};

  // follow button
  const [follow, setFollow] = React.useState(false);

  const [addFollowing] = useMutation(ADD_FOLLOWING);

  const [removeFollowing] = useMutation(REMOVE_FOLLOWING);

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

  return (
    <div className="closet">
      <ImageList
        variant="masonry"
        cols={windowSize.width > 766 ? 3 : 2}
        gap={window.innerWidth > 339 ? 16 : 8}
      >
        {images.map(({ id, img }) => (
          <div key={id} className="item-list-wrapper">
            <a type="button" onClick={handleOpen}>
              <ImageListItem key={id}>
                <img
                  src={`${img}?w=248&fit=crop&auto=format`}
                  srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt="alt goes here"
                  loading="lazy"
                  className="item-img"
                />

                {/* follow button */}
                <div>
                  <IconButton
                    size="large"
                    value={true}
                    selected={follow}
                    onChange={() => {
                      setFollow(!follow);
                    }}
                  >
                    <FavoriteIcon aria-label="follow" className="unfollow" />
                  </IconButton>
                </div>

                <ImageListItemBar
                  className="item-text"
                  title="Name"
                  position="below"
                />
              </ImageListItem>
            </a>
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
                {/* <a>
                  <CloseIcon className="close-icon"></CloseIcon>
                </a> */}
                {/* <MoreVertIcon
                  id="basic-button"
                  aria-controls={openMenu ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? 'true' : undefined}
                  onClick={handleClick}
                  className="more-icon icon"
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
                  <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                </Menu> */}
                <div className="item-modal-pic">
                  <img src={images[5].img} alt="img" />
                </div>
                <div className="item-modal-text">
                  <div className="item-name-more-div">
                    <h1>Name</h1>
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
                      <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                    </Menu>
                  </div>
                  <p>Brand Category</p>
                  <p>Size: size</p>
                  <Button className="shop-btn" variant="contained">
                    Shop
                  </Button>
                  <div className="review-div">
                    <div className="review-header">
                      <div className="avatar-pic-div">
                        <img src={images[3].img} />
                      </div>
                      <div className="username-div">
                        <a href="">
                          <p className="username">rsherman</p>
                        </a>
                        <p className="user-measurements-displayed">
                          5'5" | 140lbs
                        </p>
                      </div>
                    </div>
                    <p className="review-content">
                      I wish it was a little longer, but the look is a 10/10.
                      Review: Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit, sed do eiusmod tempor incididunt ut labore et dolore
                      magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat. Duis aute irure
                    </p>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        ))}
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
  -webkit-tap-highlight-color: transparent;
  opacity: 0.3;
`;

const style = (theme) => ({
  width: 900,
  bgcolor: theme.palette.mode === 'dark' ? '#0A1929' : '#f1f1f1',
  border: 'none',
  overflow: 'auto',
});

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
    img: require('../assets/images/atikh-bana-_KaMTEmJnxY-unsplash.jpg'),
  },
  {
    id: 5,
    img: require('../assets/images/dom-hill-nimElTcTNyY-unsplash.jpg'),
  },
  {
    id: 6,
    img: require('../assets/images/warion-taipei-vSqmb2IX3DM-unsplash.jpg'),
  },
  {
    id: 7,
    img: require('../assets/images/jasmin-chew-txy8AZU04iw-unsplash.jpg'),
  },
  {
    id: 8,
    img: require('../assets/images/noah-buscher-8A7fD6Y5VF8-unsplash.jpg'),
  },
  {
    id: 9,
    img: require('../assets/images/huston-wilson-WyDr1KFS23Y-unsplash.jpg'),
  },
];

export default HomepageItems;
