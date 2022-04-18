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

  const backdropImage = require('../../assets/images/ihssan-rami-azouagh-1YCKCCrLEbU-unsplash.jpg');
  console.log(backdropImage);
  return (
    <Box>
      <Link to={(location) => location} onClick={handleClickOpen}>
        log in
      </Link>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        sx={{
          width: '75%',
          minWidth: 380,
          margin: 'auto',
          height: 'fit-content',
          maxHeight: '100%',
          overflowY: 'scroll',
        }}
        BackdropProps={{
          style: {
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backdropImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          },
        }}
        PaperProps={{ sx: { backgroundColor: 'rgba(255, 255,255, 0.65)' } }}
      >
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