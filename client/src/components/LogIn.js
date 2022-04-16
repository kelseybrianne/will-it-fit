import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { Container, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import auth from '../utils/auth';

/** This is the dialog form for logging in a user */
function LogInForm({ setDialogState }) {
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
  });

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log({ ...formState }); // looks good here
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log('👟 Made it past mutation for login', data);
      auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  // update state based on form input changes
  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormState({
      ...formState,
      [id]: value,
    });
  };
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TextField
        autoFocus
        id="email"
        label="email"
        type="email"
        onChange={handleChange}
        value={formState.email}
        variant="standard"
      />
      <TextField
        margin="dense"
        id="password"
        label="password"
        type="password"
        onChange={handleChange}
        value={formState.password}
        variant="standard"
      />
      <Button onClick={handleFormSubmit}>Log In</Button>
      <span
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() => setDialogState('signup')}
      >
        sign up
      </span>
    </Container>
  );
}
/** This is a dialog form for signing up for an account */
function SignUpForm({ setDialogState }) {
  const [signup, { error, data }] = useMutation(ADD_USER);
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TextField
        autoFocus
        margin="dense"
        id="username"
        label="username"
        type="text"
        variant="standard"
      />
      <TextField
        margin="dense"
        id="password"
        label="password"
        type="password"
        variant="standard"
      />
      <Button>Sign Up</Button>
      <span
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() => setDialogState('login')}
      >
        log in
      </span>
    </Container>
  );
}

/** This is the main login/signup form dialog */
export default function Overlay() {
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
