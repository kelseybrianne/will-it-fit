import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';

/**
 * This is the main log in nav button with a dialog that contains
 * the switch between logging in and signing up.
 */
export default function LogIn() {
  const [open, setOpen] = React.useState(false);
  const [dialogState, setDialogState] = React.useState('login');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Link to={(location) => location} onClick={handleClickOpen}>
        log in
      </Link>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{
            alignSelf: 'end',
          }}
        >
          <CloseIcon />
        </IconButton>
        {dialogState === 'login' ? (
          <LogInForm setDialogState={setDialogState} />
        ) : (
          <SignUpForm setDialogState={setDialogState} />
        )}
      </Dialog>
    </Box>
  );
}
