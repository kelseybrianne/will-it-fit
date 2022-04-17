// react:
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Dialog } from '@mui/material';

// graphQL:
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../utils/mutations';

import './AddItem.css';

// array to make the gender a drop down
const genderDB = [
  { label: 'Womens', value: 'Womens' },
  { label: 'Mens', value: 'Mens' },
  { label: 'Unisex', value: 'Unisex' },
];
// array of colors for the drop down
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

  // const { category, size, photo, style, brand, name, gender, link, color, review } = userFormData
  // const [validated] = useState(false);

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

      <Dialog open={open} onClose={() => setOpen(false)} id="form">
        <Container
          sx={{
            maxWidth: 320,
          }}
        >
          <Box
            onSubmit={formSubmit}
            component="form"
            // sx={{
            //   '& .MuiTextField-root': { m: 1, width: '28ch' },
            // }}
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
              Add Item
            </Typography>

            {/* category */}
            <FormControl>
              <TextField
                inputStyle={{ textAlign: 'center' }}
                name="category"
                label="* Category"
                variant="filled"
                margin="dense"
                onChange={handleChange}
                value={userFormData.category}
              />
            </FormControl>

            {/* size */}
            <FormControl>
              <TextField
                name="size"
                label="* Size"
                variant="filled"
                margin="dense"
                onChange={handleChange}
                value={userFormData.size}
              />
            </FormControl>

            {/* photo */}
            <FormControl>
              <TextField
                name="photo"
                label="* Photo"
                variant="filled"
                margin="dense"
                onChange={handleChange}
                value={userFormData.photo}
              />
            </FormControl>

            {/* style */}
            <FormControl>
              <TextField
                name="style"
                label="Style"
                variant="filled"
                margin="dense"
                onChange={handleChange}
                value={userFormData.style}
              />
            </FormControl>

            {/* brand */}
            <FormControl>
              <TextField
                name="brand"
                label="Brand"
                variant="filled"
                margin="dense"
                onChange={handleChange}
                value={userFormData.brand}
              />
            </FormControl>

            {/* name */}
            <FormControl>
              <TextField
                name="name"
                label="* Name"
                variant="filled"
                margin="dense"
                onChange={handleChange}
                value={userFormData.name}
              />
            </FormControl>

            {/* gender - drop down menu */}
            <FormControl>
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
            </FormControl>

            {/* link */}
            <FormControl>
              <TextField
                name="link"
                label="Link"
                margin="dense"
                variant="filled"
                onChange={handleChange}
                value={userFormData.link}
              />
            </FormControl>

            {/* color */}
            <FormControl>
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
            </FormControl>

            {/* review */}
            <TextareaAutosize
              //  fullWidth ={true}
              name="review"
              variant="filled"
              margin="dense"
              aria-label="minimum height"
              minRows={5}
              placeholder="Add your review here:"
              style={{ m: 1, width: 435 }}
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
              margin="dense"
              fullWidth={true}
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
  );
};

export default AddItem;


