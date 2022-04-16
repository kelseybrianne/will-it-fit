import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { Container, TextField, Typography } from '@mui/material';
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
    try {
      const { data } = await login({
        variables: { ...formState },
      });
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
        maxWidth: 320,
      }}
    >
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          display: 'flex',
          fontFamily: 'var(--serif)',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'var(--serif)',
            fontSize: 40,
            py: 2,
          }}
        >
          Will It Fit?
        </Typography>
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
          id="password"
          label="password"
          type="password"
          onChange={handleChange}
          value={formState.password}
          variant="standard"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            py: 1.5,
            my: 2,
            fontFamily: 'var(--serif)',
            textTransform: 'none',
            backgroundColor: '#B95252',
            ':hover': {
              backgroundColor: '#B95252AA',
            },
          }}
        >
          Log in
        </Button>
        <Typography variant="subtitle1" sx={{ py: 2 }}>
          <span>Don't have an account? </span>
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => setDialogState('signup')}
          >
            Sign up
          </span>
        </Typography>
      </Box>
    </Container>
  );
}
/** This is a dialog form for signing up for an account */
function SignUpForm({ setDialogState }) {
  const [signup, { error, data }] = useMutation(ADD_USER);
  const [formState, setFormState] = React.useState({
    username: '',
    email: '',
    password: '',
    height: null,
    weight: null,
    shoeSize: '',
  });

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await signup({
        variables: { ...formState },
      });
      auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: '',
      email: '',
      password: '',
      height: 0,
      weight: 0,
      shoeSize: '',
    });
  };
  // update state based on form input changes
  const handleChange = (event) => {
    let { id, value, type } = event.target;
    if (type === 'number') {
      value = value ? parseFloat(value) : undefined;
    }

    setFormState({
      ...formState,
      [id]: value,
    });
  };
  return (
    <Container
      sx={{
        maxWidth: 320,
      }}
    >
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          display: 'flex',
          fontFamily: 'var(--serif)',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'var(--serif)',
            fontSize: 40,
            py: 2,
          }}
        >
          Will It Fit?
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="username"
          type="text"
          variant="standard"
          onChange={handleChange}
          value={formState.username}
        />
        <TextField
          margin="dense"
          id="email"
          label="email"
          type="email"
          variant="standard"
          onChange={handleChange}
          value={formState.email}
        />
        <TextField
          margin="dense"
          id="password"
          label="password"
          type="password"
          variant="standard"
          onChange={handleChange}
          value={formState.password}
        />
        <TextField
          margin="dense"
          id="height"
          label="height"
          type="number"
          variant="standard"
          onChange={handleChange}
          value={formState.height}
        />
        <TextField
          margin="dense"
          id="weight"
          label="weight"
          type="number"
          variant="standard"
          onChange={handleChange}
          value={formState.weight}
        />
        <TextField
          margin="dense"
          id="shoeSize"
          label="shoe size"
          type="text"
          variant="standard"
          onChange={handleChange}
          value={formState.shoeSize}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            py: 1.5,
            my: 2,
            fontFamily: 'var(--serif)',
            textTransform: 'none',
            backgroundColor: '#B95252',
            ':hover': {
              backgroundColor: '#B95252AA',
            },
          }}
        >
          Sign up
        </Button>
        <Typography variant="subtitle1" sx={{ py: 2 }}>
          <span>Already have an account? </span>
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => setDialogState('login')}
          >
            Log in
          </span>
        </Typography>
      </Box>
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
