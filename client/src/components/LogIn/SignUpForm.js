import { useMutation } from '@apollo/client';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

/** This is a dialog form for signing up for an account */
function SignUpForm({ setDialogState }) {
  const [signup, { error, data }] = useMutation(ADD_USER);
  const [formState, setFormState] = useState({
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

export default SignUpForm;
