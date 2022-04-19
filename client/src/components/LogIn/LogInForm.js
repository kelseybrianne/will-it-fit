import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';

/** This is the dialog form for logging in a user */
function LogInForm({ setDialogState }) {
  const [login, { loading, error }] = useMutation(LOGIN_USER);
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
      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    } catch (e) {
      console.error(e);
    }
  };
  // update state based on form input changes
  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormState({
      ...formState,
      [id]: value,
    });
  };

  const handleError = (error) => {
    if (!error) {
      return false;
    }
    return error.message || 'There was an error';
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
          required={true}
          error={error}
          onChange={handleChange}
          value={formState.email}
        />
        <TextField
          id="password"
          placeholder="password"
          type="password"
          required={true}
          error={error}
          onChange={handleChange}
          value={formState.password}
        />
        {error ? (
          <Typography variant="subtitle2" color="error">
            {handleError(error)}
          </Typography>
        ) : (
          ''
        )}
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          sx={{
            py: '16px',
            fontFamily: 'var(--serif)',
            textTransform: 'none',
            backgroundColor: '#B95252',
            ':hover': {
              backgroundColor: '#B95252AA',
            },
          }}
        >
          Log in
        </LoadingButton>
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
