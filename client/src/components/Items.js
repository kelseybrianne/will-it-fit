import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import BoxComp from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import ItemModal from './ItemModal.js';
import './Items.css';

const Items = ({ windowSize }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // use useState and useEffect to track window width so line 44 updates without refreshing
  console.log(window.innerWidth);
  console.log(windowSize);

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
        // cols={window.innerWidth > 766 ? 3 : 2}
        cols={windowSize.width > 766 ? 3 : 2}
        gap={window.innerWidth > 339 ? 16 : 8}
      >
        {images.map(({ id, img }) => (
          <div key={id} className="item-list-wrapper">
            {/* <button>
              <FavoriteBorderIcon className="heart-icon icon" />
            </button> */}
            <a type="button" onClick={handleOpen}>
              <ImageListItem key={id}>
                <MoreVertIcon
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
                </Menu>
                <img
                  src={`${img}?w=248&fit=crop&auto=format`}
                  srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt="alt goes here"
                  loading="lazy"
                  className="item-img"
                />
                <ImageListItemBar
                  className="item-text"
                  title="Name"
                  subtitle="Brand Category"
                  position="below"
                />
              </ImageListItem>
            </a>
            {/* <ItemModal /> */}
            <Modal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}
              BackdropComponent={Backdrop}
            >
              <Box sx={style}>
                <h2 id="unstyled-modal-title">Text in a modal</h2>
                <p id="unstyled-modal-description">
                  Aliquid amet deserunt earum!
                </p>
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
  width: 400,
  bgcolor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  border: '2px solid currentColor',
  padding: '16px 32px 24px 32px',
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

export default Items;
