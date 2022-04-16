// react:
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useFormControl } from '@mui/material/FormControl';

import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';

// import Menu from '@mui/material/Menu';

// graphQL:
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../utils/mutations';

import './AddItem.css';
import Auth from '../utils/auth';

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
  const [validated] = useState(false);

  const [addItem] = useMutation(ADD_ITEM);

  const handleInputChange = (event) => {
    setUserFromData(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addItem({
        variables: { ...userFormData },
      });
      // Auth.addItem(data.addItem.token);
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
        validate={validated}
        onSubmit={handleFormSubmit}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <FormControl variant="filled">
          <TextField
            // required
            id="filled-basic"
            label="* Category"
            variant="filled"
            onChange={handleInputChange}
            value={userFormData.category}
          />
        </FormControl>

        <TextField
          id="filled-basic"
          label="Style"
          variant="filled"
          onChange={handleInputChange}
          value={userFormData.style}
        />
        <TextField
          id="filled-basic"
          label="Brand"
          variant="filled"
          onChange={handleInputChange}
          value={userFormData.brand}
        />
        <TextField
          id="filled-basic"
          label="* Name"
          // defaultValue="Name"
          variant="filled"
          onChange={handleInputChange}
          value={userFormData.name}
        />

        {/* <TextField select label="Gender" variant="filled" 
       
        >
          {genderDB.map((option) => (
            <MenuItem
              size="large"
              key={option.value}
              value={option.value}
              onChange={handleInputChange}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField> */}

        <TextField
          label="* Size"
          // defaultValue="Size"
          variant="filled"
          onChange={handleInputChange}
          value={userFormData.size}
        />
        <TextField
          label="Link"
          variant="filled"
          onChange={handleInputChange}
          value={userFormData.link}
        />

        <TextField
          label="* Photo"
          // defaultValue="Photo"
          variant="filled"
          onChange={handleInputChange}
          value={userFormData.photo}
        />

        <TextField
          id="filled-basic"
          label="Color"
          variant="filled"
          onChange={handleInputChange}
          value={userFormData.color}
        />
        <TextareaAutosize
          variant="filled"
          aria-label="minimum height"
          minRows={5}
          placeholder="Add your review here"
          style={{ width: 435 }}
          onChange={handleInputChange}
          value={userFormData.review}
        />
      </Box>
      <Button
        id="add-btn"
        // disabled={
        //   !(
        //     userFormData.category &&
        //     userFormData.name &&
        //     userFormData.size &&
        //     userFormData.photo
        //   )
        // }
        type="submit"
        variant="contained"
      >
        Submit Item
      </Button>
    </div>
  );
};

export default AddItem;
