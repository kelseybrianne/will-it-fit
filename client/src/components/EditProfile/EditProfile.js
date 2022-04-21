import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography, Container, Dialog } from '@mui/material';

// graphQL:
// import { useMutation } from '@apollo/client';
// import { ADD_ITEM } from '../../utils/mutations';

const EditProfile = () => {
  //   const [addItem] = useMutation(ADD_ITEM);
  // useMutation(EDIT_PROFILE)
  const [open, setOpen] = React.useState(false);
  //   const [previewSource, setPreviewSource] = React.useState(null);
  const [userFormData, setUserFromData] = React.useState({
    height: '',
    weight: '',
  });

  //   let photo = '';
  //   // shows user image preview
  //   const handleFileInputChange = (e) => {
  //     const file = e.target.files[0];
  //     previewFile(file);
  //   };

  //   const previewFile = (file) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setPreviewSource(reader.result);
  //     };
  //   };

  // upload image to cloudinary, receive URL as res
  //   const uploadImage = async (base64EncodedImage) => {
  //     try {
  //       const response = await fetch('/api/upload', {
  //         method: 'POST',
  //         body: JSON.stringify({ data: base64EncodedImage }),
  //         headers: { 'content-type': 'application/json' },
  //       });

  //       if (response.ok) {
  //         const url = await response.json();
  //         photo = url;
  //       } else {
  //         console.log(response);
  //         return response;
  //       }
  //     } catch (error) {
  //       return console.error(error);
  //     }
  //   };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFromData({
      ...userFormData,
      [name]: value,
    });
  };

  //   const formSubmit = async (event) => {
  //     event.preventDefault();
  //     window.location.reload(false);
  //     try {
  //       //   await uploadImage(previewSource);
  //       await addItem({
  //         variables: { ...userFormData, photo: photo },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //     setUserFromData({
  //       height: '',
  //       weight: '',
  //     });
  //   };
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
              //   onSubmit={formSubmit}
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
                  padding: '10px 0px 30px',
                }}
              >
                Edit Profile
              </Typography>

              {/* height */}
              <TextField
                className="input"
                name="height"
                label="* Height"
                onChange={handleChange}
                value={userFormData.height}
                sx={{
                  backgroundColor: 'white',
                  '& .MuiInputBase-input-MuiOutlinedInput-input': {
                    border: 'none',
                  },
                }}
              />

              {/* weight */}
              <TextField
                className="input"
                name="weight"
                label="* Weight"
                sx={{ backgroundColor: 'white' }}
                onChange={handleChange}
                value={userFormData.weight}
              />
              {/* image upload */}

              {/* <input
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
              </label> */}
              {/* {previewSource && (
                <Box mt={2} textAlign="center">
                  <div>Image Preview:</div>
                  <img src={previewSource} alt={previewSource} height="100px" />
                </Box>
              )} */}

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
