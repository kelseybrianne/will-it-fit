// react:
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';

// import Menu from '@mui/material/Menu';

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

const AddItem = () => {
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
    <div id="form">
      <Box
        // validate={validated}
        onSubmit={formSubmit}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        {/* category */}
        <FormControl>
          <TextField
            name="category"
            label="* Category"
            variant="filled"
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
            variant="filled"
            onChange={handleChange}
          >
            {genderDB.map((option) => (
              <MenuItem size="large" key={option.value} value={option.value}>
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
            variant="filled"
            onChange={handleChange}
            value={userFormData.link}
          />
        </FormControl>

        {/* color */}
        <FormControl>
          <TextField
            name="color"
            label="Color"
            variant="filled"
            onChange={handleChange}
            value={userFormData.color}
          />
        </FormControl>

        {/* review */}
        <TextareaAutosize
          name="review"
          variant="filled"
          aria-label="minimum height"
          minRows={5}
          placeholder="Add your review here"
          style={{ width: 435 }}
          onChange={handleChange}
          value={userFormData.review}
        />
      </Box>

      <Button
        // disabled={
        //   !(
        //     userFormData.category &&
        //     userFormData.name &&
        //     userFormData.size &&
        //     userFormData.photo
        //   )}
        type="submit"
        variant="contained"
      >
        Submit Item
      </Button>
    </div>
  );
};

export default AddItem;
