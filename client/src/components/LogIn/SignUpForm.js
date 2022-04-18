import { useMutation } from '@apollo/client';
import { Button, Container, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { useState } from 'react';
import auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

/** This is a dialog form for signing up for an account */
function SignUpForm({ setDialogState }) {
  const [signup, { loading, error }] = useMutation(ADD_USER);
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    height: '',
    weight: '',
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
      // clear form values
      setFormState({
        username: '',
        email: '',
        password: '',
        height: '',
        weight: '',
        shoeSize: '',
      });
    } catch (e) {
      console.error(e);
    }
  };
  // update state based on form input changes
  const handleChange = (event) => {
    let { id, value, type } = event.target;
    if (type === 'number') {
      value = value ? parseFloat(value) : '';
    }

    setFormState({
      ...formState,
      [id]: value,
    });
  };

  const handleError = (error, field) => {
    if (!error) {
      return false;
    }
    let message = '';
    if (error.message.indexOf(field) >= 0) {
      message = `There was an error with the ${field}`;
      switch (field) {
        case 'username':
          message = `${error.message}`;
          break;
        case 'email':
          message = `${error.message}`;
          break;
        default:
          break;
      }
    }
    return message;
  };

  return (
    <Container
      sx={{
        width: 320,
        height: '100%',
        py: 4,
      }}
    >
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          gap: 1,
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
          placeholder="username"
          type="text"
          required={true}
          error={handleError(error, 'username')}
          helperText={handleError(error, 'username')}
          onChange={handleChange}
          value={formState.username}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          margin="dense"
          id="email"
          placeholder="email"
          type="email"
          required={true}
          error={handleError(error, 'email')}
          helperText={handleError(error, 'email')}
          onChange={handleChange}
          value={formState.email}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          margin="dense"
          id="password"
          placeholder="password"
          type="password"
          required={true}
          onChange={handleChange}
          value={formState.password}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          margin="dense"
          id="height"
          placeholder="height"
          type="number"
          required={true}
          onChange={handleChange}
          value={formState.height}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          margin="dense"
          id="weight"
          placeholder="weight"
          type="number"
          required={true}
          onChange={handleChange}
          value={formState.weight}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          margin="dense"
          id="shoeSize"
          placeholder="shoe size"
          type="text"
          required={true}
          onChange={handleChange}
          value={formState.shoeSize}
          sx={{ backgroundColor: 'white' }}
        />
        {error ? <Typography>{handleError(error)}</Typography> : ''}
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingPosition="end"
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
        </LoadingButton>
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

export default SignUpForm;
