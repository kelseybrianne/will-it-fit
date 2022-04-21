// react:
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button, Typography, Container, Dialog } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import './AddItem.css';

// graphQL:
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../../utils/mutations';

let filter = require('leo-profanity');

// *arrays for drop downs*:

// category
const categoryDB = [
  { label: 'Shoes', value: 'Shoes' },
  { label: 'Socks', value: 'Socks' },
  { label: 'Pants', value: 'Pants' },
  { label: 'Jeans', value: 'Jeans' },
  { label: 'Leggings', value: 'Leggings' },
  { label: 'Skirts', value: 'Skirt' },
  { label: 'Dresses', value: 'Dresses' },
  { label: 'T-shirt', value: 'Tshirt' },
  { label: 'Button-up Shirt', value: 'Button-up' },
  { label: 'Tank-top', value: 'Tank' },
  { label: 'Active', value: 'Active' },
  { label: 'Jacket', value: 'Jacket' },
  { label: 'Swimwear', value: 'Swimwear' },
  { label: 'Outdoor Wear', value: 'Outdoor' },
  { label: 'Hats', value: 'Hat' },
];

// style
const styleDB = [
  { label: 'Street Wear', value: 'Street' },
  { label: 'Formal Wear', value: 'Formal' },
  { label: 'Vintage', value: 'Vintage' },
  { label: 'Sporty', value: 'Sport' },
  { label: 'Artsy', value: 'Artsy' },
  { label: 'Casual', value: 'Casual' },
  { label: 'Business Casual', value: 'Business' },
  { label: 'Exotic', value: 'Exotic' },
  { label: 'Outerwear', value: 'Outerwear' },
  { label: 'Maternity', value: 'Maternity' },
  { label: 'Sleepwear', value: 'Sleep' },
  { label: 'Other', value: 'Other' },
];

// gender
const genderDB = [
  { label: 'Womens', value: 'Womens' },
  { label: 'Mens', value: 'Mens' },
  { label: 'Unisex', value: 'Unisex' },
];
//  colors
const colorDB = [
  { label: 'Red', value: 'Red' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Yellow', value: 'Yellow' },
  { label: 'Green', value: 'Green' },
  { label: 'Blue', value: 'Blue' },
  { label: 'Purple', value: 'Purple' },
  { label: 'Pink', value: 'Pink' },
  { label: 'White', value: 'White' },
  { label: 'Grey', value: 'Grey' },
  { label: 'Black', value: 'Black' },
  { label: 'Brown', value: 'Brown' },
];
const AddItem = () => {
  const [addItem] = useMutation(ADD_ITEM);
  const [open, setOpen] = React.useState(false);
  const [previewSource, setPreviewSource] = React.useState(null);
  const [userFormData, setUserFromData] = React.useState({
    name: '',
    category: '',
    size: '',
    style: '',
    brand: '',
    gender: '',
    link: '',
    color: '',
    review: '',
  });

  let photo = '';
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

  // upload image to cloudinary, receive URL as res
  const uploadImage = async (base64EncodedImage) => {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'content-type': 'application/json' },
      });

      if (response.ok) {
        const url = await response.json();
        photo = url;
      } else {
        console.log(response);
        return response;
      }
    } catch (error) {
      return console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFromData({
      ...userFormData,
      [name]: value,
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    try {
      await uploadImage(previewSource);
      await addItem({
        variables: { ...userFormData, photo: photo },
      });
    } catch (e) {
      console.error(e);
    }
    setUserFromData({
      name: '',
      category: '',
      size: '',
      style: '',
      brand: '',
      gender: '',
      link: '',
      color: '',
      review: '',
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
        Add Item
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
                  padding: '10px 0px 30px',
                }}
              >
                Add An Item:
              </Typography>

              {/* name */}
              <TextField
                className="input"
                name="name"
                label="* Name"
                onChange={handleChange}
                value={filter.clean(userFormData.name)}
                sx={{
                  backgroundColor: 'white',
                  '& .MuiInputBase-input-MuiOutlinedInput-input': {
                    border: 'none',
                  },
                }}
              />

              {/* category */}
              <TextField
                className="input"
                name="category"
                label="* Category"
                sx={{ backgroundColor: 'white' }}
                onChange={handleChange}
                value={userFormData.category}
                select
              >
                {categoryDB.map((option) => (
                  <MenuItem
                    size="large"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* size */}
              <TextField
                className="input"
                name="size"
                // label= '* Size'
                label="* Size"
                sx={{ backgroundColor: 'white' }}
                onChange={handleChange}
                value={filter.clean(userFormData.size)}
              />

              {/* style */}
              <TextField
                className="input"
                name="style"
                label="Style"
                sx={{ backgroundColor: 'white' }}
                onChange={handleChange}
                value={userFormData.style}
                select
              >
                {styleDB.map((option) => (
                  <MenuItem
                    size="large"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* brand */}
              <TextField
                className="input"
                name="brand"
                label="Brand"
                sx={{ backgroundColor: 'white' }}
                onChange={handleChange}
                value={filter.clean(userFormData.brand)}
              />

              {/* gender - drop down menu */}
              <TextField
                className="input"
                name="gender"
                select
                value={userFormData.gender}
                label="Gender"
                sx={{ backgroundColor: 'white' }}
                onChange={handleChange}
              >
                {genderDB.map((option) => (
                  <MenuItem
                    size="large"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* link */}
              <TextField
                className="input"
                name="link"
                label="Link"
                sx={{ backgroundColor: 'white' }}
                onChange={handleChange}
                value={filter.clean(userFormData.link)}
              />

              {/* color */}
              <TextField
                className="input"
                name="color"
                select
                value={userFormData.color}
                label="Color"
                sx={{ backgroundColor: 'white' }}
                onChange={handleChange}
              >
                {colorDB.map((option) => (
                  <MenuItem
                    size="large"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              {/* review */}
              <TextareaAutosize
                //  fullWidth ={true}
                className="textarea-input"
                name="review"
                variant="filled"
                aria-label="minimum height"
                minRows={5}
                placeholder="Add your review here:"
                style={{ m: 1, width: 450, fontFamily: 'var(--sans)' }}
                onChange={handleChange}
                value={filter.clean(userFormData.review)}
              />

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
                  sx={{
                    py: 1.5,
                    mt: 2,
                    backgroundColor: '#B95252',
                    ':hover': {
                      backgroundColor: '#B95252AA',
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
                  {/* <div>Image Preview:</div> */}
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
                  !(
                    userFormData.category &&
                    userFormData.name &&
                    userFormData.size &&
                    previewSource !== null
                  )
                }
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Box>
          </Container>
        </Dialog>
      </div>
    </div>
  );
};

export default AddItem;
