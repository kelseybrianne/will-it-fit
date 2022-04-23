import React from 'react';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ToggleHeartIcons = ({ saved, toggleHeartIcon }) => {
  const handleToggle = (e) => {
    e.stopPropagation();
      toggleHeartIcon();
  }

  return (
    <>
      <div className="toggle-wrapper">
        {saved ? (
            <FavoriteIcon onClick={handleToggle} className="heart-icon icon saved-icon" /> 
        ) : (
            <FavoriteBorder onClick={handleToggle} className="heart-icon icon" />

        )}
      </div>
    </>
  );
};

export default ToggleHeartIcons;
