import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import auth from '../utils/auth';
import { Link } from 'react-router-dom';

export default function ProfileMenu() {
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
          <Avatar sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Tooltip>
      <Drawer
        id="account-menu"
        open={open}
        anchor="right"
        onClose={handleClose}
        onClick={handleClose}
      >
        <Link to="/profile">
          <MenuItem>
            <ListItemIcon>
              <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            edit profile
          </MenuItem>
        </Link>
        <Divider />
        <Link to="/closet">
          <MenuItem>
            <ListItemIcon>
              <CheckroomIcon fontSize="small" />
            </ListItemIcon>
            my closet
          </MenuItem>
        </Link>
        <Link to="/saved">
          <MenuItem>
            <ListItemIcon>
              <FavoriteIcon fontSize="small" />
            </ListItemIcon>
            my saved items
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={auth.logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          log out
        </MenuItem>
      </Drawer>
    </>
  );
}
