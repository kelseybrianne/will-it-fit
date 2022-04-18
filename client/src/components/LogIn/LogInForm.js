import { useMutation } from '@apollo/client';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';

/** This is the dialog form for logging in a user */
function LogInForm({ setDialogState }) {
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({
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
          textAlign: 'center',
          height: '100%',
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
          id="email"
          placeholder="email"
          type="email"
          onChange={handleChange}
          value={formState.email}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          id="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
          value={formState.password}
          sx={{ backgroundColor: 'white' }}
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

export default LogInForm;
