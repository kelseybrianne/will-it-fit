import * as React from 'react';
import Box from '@mui/material/Box';
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
import './Items.css';

const Items = ({ windowSize }) => {
  // use useState and useEffect to track window width so line 44 updates without refreshing
  console.log(window.innerWidth);
  console.log(windowSize);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
            <a href="">
              <ImageListItem key={id}>
                <MoreVertIcon
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  className="more-icon icon"
                />
                <Menu
                  id="basic-menu"
                  elevation={0}
                  className="dropdown-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>Delete</MenuItem>
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
          </div>
        ))}
      </ImageList>
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

export default Items;
