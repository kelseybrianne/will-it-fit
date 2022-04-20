import {
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon from '@mui/icons-material/Search';

import { Link } from 'react-router-dom';

export default function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        id="account-menu"
        open={open}
        anchor="left"
        onClose={handleClose}
        onClick={handleClose}
      >
        <Link to="/">
          <MenuItem>
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            home
          </MenuItem>
        </Link>
        <Divider />
        <Link to="/discover">
          <MenuItem>
            <ListItemIcon>
              <PersonAddAltIcon fontSize="small" />
            </ListItemIcon>
            discover
          </MenuItem>
        </Link>
        <MenuItem>
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          search
        </MenuItem>
      </Drawer>
    </>
  );
}
