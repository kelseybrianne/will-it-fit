import React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import './Items.css';

const Items = () => {
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

  // use useState and useEffect to track window width so line 44 updates without refreshing
  console.log(window.innerWidth);

  return (
    <div className="closet">
      <ImageList
        variant="masonry"
        cols={window.innerWidth > 766 ? 3 : 2}
        gap={window.innerWidth > 339 ? 16 : 8}
      >
        {images.map(({ id, img }) => (
            <a href="" key={id}>
          <ImageListItem >
            <img
              src={`${img}?w=248&fit=crop&auto=format`}
              srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt="alt goes here"
              loading="lazy"
              className="item-img"
            />
            {/* <ImageListItemBar
              title="Brand Category - Size"
              subtitle="Review preview..."
              position="below"
              className="item-text"
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about`}
                ></IconButton>
              }
            /> */}
            <ImageListItemBar
              className="item-text"
              title="Name"
            //   subtitle={<span>title of the productfffffffffff yes yes yayyya who hoooo</span>}
              subtitle="Brand Category"
              position="below"
            />
          </ImageListItem>
          </a>
        ))}
      </ImageList>
    </div>
  );
};

export default Items;
