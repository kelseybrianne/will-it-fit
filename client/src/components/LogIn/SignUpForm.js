import { useMutation } from '@apollo/client';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import auth from '../../utils/auth';
import { ADD_USER, SINGLE_UPLOAD } from '../../utils/mutations';

/** This is a dialog form for signing up for an account */
function SignUpForm({ setDialogState }) {
  const [signup, { error, data }] = useMutation(ADD_USER);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  const [uploadFile] = useMutation(SINGLE_UPLOAD, {
    onCompleted: (data) => console.log(data),
  });

  const handleFileUpload = () => {
    alert('handleFileUpload reached');
    const file = selectedImage;
    // working
    console.log(file);
    // not working, needs createUploadLink, only httpLink or createUploadLink work, not both.
    uploadFile({ variables: { file } });
  };

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
    alert('handleformsubmit');
    event.preventDefault();
    try {
      const { data } = await signup({
        variables: { ...formState },
      }).then(handleFileUpload());

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
    handleFileUpload();
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
        width: 320,
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
          alignContent: 'center',
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
        {/* image upload */}
        <input
          accept="image/*"
          type="file"
          id="select-image"
          style={{ display: 'none' }}
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        <label htmlFor="select-image">
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>
        {imageUrl && selectedImage && (
          <Box mt={2} textAlign="center">
            {/* <div>Image Preview:</div> */}
            <img src={imageUrl} alt={selectedImage.name} height="100px" />
          </Box>
        )}

        {/* Begin standard form questions */}
        <TextField
          autoFocus
          margin="dense"
          id="username"
          placeholder="username"
          type="text"
          onChange={handleChange}
          value={formState.username}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          margin="dense"
          id="email"
          placeholder="email"
          type="email"
          onChange={handleChange}
          value={formState.email}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          margin="dense"
          id="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
          value={formState.password}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          margin="dense"
          id="height"
          placeholder="height"
          type="number"
          onChange={handleChange}
          value={formState.height}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          margin="dense"
          id="weight"
          placeholder="weight"
          type="number"
          onChange={handleChange}
          value={formState.weight}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          margin="dense"
          id="shoeSize"
          placeholder="shoe size"
          type="text"
          onChange={handleChange}
          value={formState.shoeSize}
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
