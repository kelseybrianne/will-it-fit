import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Button,
  Typography,
  Container,
  Dialog,
  InputAdornment,
} from '@mui/material';

// graphQL:
import { useMutation } from '@apollo/client';
import { EDIT_PROFILE, EDIT_PROFILEPHOTO } from '../../utils/mutations';

// image upload
import uploadImage from '../../utils/uploadImage';
const EditProfile = () => {
  const [editProfile] = useMutation(EDIT_PROFILE);
  const [editProfilePhoto] = useMutation(EDIT_PROFILEPHOTO);
  const [open, setOpen] = React.useState(false);
  const [previewSource, setPreviewSource] = React.useState(null);
  const [userFormData, setUserFromData] = React.useState({
    height: '',
    weight: '',
  });

  let primaryPhoto = '';
  // shows user image preview
  // shows user image preview
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    // only call edit profile photo if a photo was added. Otherwise proceed to update height and weight.
    try {
      if (previewSource) {
        const primaryPhoto = await uploadImage(previewSource);
        await editProfilePhoto({
          variables: { primaryPhoto: primaryPhoto },
        });
      }
      // update height and weight
      await editProfile({
        variables: { ...userFormData },
      });
    } catch (e) {
      console.error(e);
    }
    setUserFromData({
      height: '',
      weight: '',
    });
    window.location.reload(false);
  };

  // update state based on form input changes
  const handleChange = (event) => {
    let { id, value, type } = event.target;
    if (type === 'number') {
      value = value ? parseFloat(value) : '';
    }
    setUserFromData({
      ...userFormData,
      [id]: value,
    });
  };
  return (
    <div>
      <Button
        onClick={(e) => {
          setOpen(true);
          e.preventDefault();
        }}
        variant="contained"
      >
        Edit Profile
      </Button>

      <div>
        <Dialog open={open} onClose={() => setOpen(false)} id="form">
          <Container
            sx={{
              backgroundColor: '#f3f3f3',
              maxWidth: 500,
              py: 3,
            }}
          >
            <Box
              onSubmit={formSubmit}
              component="form"
              sx={{
                display: 'flex',
                fontFamily: 'var(--serif)',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'var(--serif)',
                  textAlign: 'center',
                  fontSize: 25,
                  py: 2,
                  padding: '10px 0px 30px',
                }}
              >
                Edit Profile
              </Typography>
              <TextField
                id="height"
                placeholder="height"
                type="number"
                required={true}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">in</InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: 'white',
                  '& .MuiInputBase-input-MuiOutlinedInput-input': {
                    border: 'none',
                  },
                }}
                value={userFormData.height}
              />
              <TextField
                id="weight"
                placeholder="weight"
                type="number"
                required={true}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">lbs</InputAdornment>
                  ),
                }}
                sx={{ my: 2, backgroundColor: 'white' }}
                value={userFormData.weight}
              />

              {/* height */}
              {/* <TextField
                id="height"
                className="input"
                name="height"
                label="* Height"
                type="number"
                onChange={handleChange}
                value={userFormData.height}
               
              /> */}

              {/* weight */}
              {/* <TextField
                id="weight"
                className="input"
                name="weight"
                type="number"
                label="* Weight"
                sx={{ backgroundColor: 'white' }}
                onChange={handleChange}
                value={userFormData.weight}
              /> */}

              {/* image upload */}

              <input
                accept="image/*"
                type="file"
                encType="multipart/form-data"
                id="select-image"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
              />
              <label htmlFor="select-image">
                <Button
                  variant="contained"
                  className="MuiOutlinedInput-root"
                  sx={{
                    py: 1.5,
                    mt: 2,
                    fontFamily: 'var(--serif)',
                    textTransform: 'none',
                    width: '100%',
                    backgroundColor: '#5196B8',
                    ':hover': {
                      backgroundColor: '#5196B8AA',
                    },
                  }}
                  // color="primary"
                  component="span"
                >
                  Upload Image
                </Button>
              </label>
              {previewSource && (
                <Box mt={2} textAlign="center">
                  <div>Image Preview:</div>
                  <img src={previewSource} alt={previewSource} height="100px" />
                </Box>
              )}

              <Button
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
                // margin="dense"
                // fullWidth={true}
                disabled={
                  !(userFormData.height && userFormData.weight !== null)
                }
                type="submit"
                variant="contained"
              >
                Update
              </Button>
            </Box>
          </Container>
        </Dialog>
      </div>
    </div>
  );
};

export default EditProfile;
