// react:
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button, Typography, Container, Dialog } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import background from '../assets/images/ihssan-rami-azouagh-1YCKCCrLEbU-unsplash.jpg';

// graphQL:
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../utils/mutations';

// *arrays for drop downs*:

// category
const categoryDB = [
  { label: 'Shoes', value: 'Shoes' },
  { label: 'Socks', value: 'Socks' },
  { label: 'Pants', value: 'Pants' },
  { label: 'Jeans', value: 'Jeans' },
  { label: 'Leggings', value: 'Leggings' },
  { label: 'Skirt', value: 'Skirt' },
  { label: 'Dress', value: 'Dress' },
  { label: 'T-shirt', value: 'Tshirt' },
  { label: 'Button-up Shirt', value: 'Button-up' },
  { label: 'Tank-top', value: 'Tank' },
  { label: 'Jacket', value: 'Jacket' },
  { label: 'Outdoor Wear', value: 'Outdoor' },
  { label: 'Hat', value: 'Hat' },

]

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
  { label: 'Swimwear', value: 'Swimwear' },
  { label: 'Outerwear', value: 'Outerwear' },
  { label: 'Maternity', value: 'Maternity' },
  { label: 'Sleep', value: 'Sleep' },
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
  const [open, setOpen] = React.useState(false);
  const [userFormData, setUserFromData] = React.useState({
    category: '',
    size: '',
    photo: '',
    style: '',
    brand: '',
    name: '',
    gender: '',
    link: '',
    color: '',
    review: '',
  });

  const [addItem] = useMutation(ADD_ITEM);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log('🤘', event.target);
    setUserFromData({
      ...userFormData,
      [name]: value,
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    try {
      await addItem({
        variables: { ...userFormData },
      });
    } catch (e) {
      console.error(e);
    }
    setUserFromData({
      category: '',
      size: '',
      photo: '',
      style: '',
      brand: '',
      name: '',
      gender: '',
      link: '',
      color: '',
      review: '',
    });
    console.log('🤘', setUserFromData);
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

      <div style={{ backgroundImage: `url(${background})` }}>
        <Dialog open={open} onClose={() => setOpen(false)} id="form">
          <Container
            sx={{
              maxWidth: 320,
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
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'var(--serif)',
                  fontSize: 20,
                  py: 2,
                }}
              >
                Add An Item:
              </Typography>

              {/* category */}

              <TextField
                inputStyle={{ textAlign: 'center' }}
                name="category"
                label="* Category"
                variant="filled"
                margin="dense"
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
                name="size"
                label="* Size"
                variant="filled"
                margin="dense"
                onChange={handleChange}
                value={userFormData.size}
              />

              {/* photo */}

              <TextField
                name="photo"
                label="* Photo"
                variant="filled"
                margin="dense"
                onChange={handleChange}
                value={userFormData.photo}
              />

              {/* style */}

              <TextField
                name="style"
                label="Style"
                variant="filled"
                margin="dense"
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
                name="brand"
                label="Brand"
                variant="filled"
                margin="dense"
                onChange={handleChange}
                value={userFormData.brand}
              />

              {/* name */}

              <TextField
                name="name"
                label="* Name"
                variant="filled"
                margin="dense"
                onChange={handleChange}
                value={userFormData.name}
              />

              {/* gender - drop down menu */}

              <TextField
                name="gender"
                select
                value={userFormData.gender}
                label="Gender"
                margin="dense"
                variant="filled"
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
                name="link"
                label="Link"
                margin="dense"
                variant="filled"
                onChange={handleChange}
                value={userFormData.link}
              />

              {/* color */}
              <TextField
                name="color"
                select
                value={userFormData.color}
                label="Color"
                margin="dense"
                variant="filled"
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

              {/* review */}
              <TextareaAutosize
                //  fullWidth ={true}
                name="review"
                variant="filled"
                margin="dense"
                aria-label="minimum height"
                minRows={5}
                placeholder="Add your review here:"
                style={{ m: 1, width: 450 }}
                onChange={handleChange}
                value={userFormData.review}
              />

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
                    userFormData.photo
                  )
                }
                type="submit"
                variant="contained"
              >
                Submit Item
              </Button>
            </Box>
          </Container>
        </Dialog>
      </div>
    </div>
  );
};

export default AddItem;
