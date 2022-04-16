// react:
import * as React from 'react';
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
  // const [validated] = useState(false);

  const [addItem] = useMutation(ADD_ITEM);

  const handleInputChange = (event) => {
    setUserFromData(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addItem({
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
        // validate={validated}
        onSubmit={handleFormSubmit}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <FormControl>
          <TextField
            label="* Category"
            variant="filled"
            onChange={handleInputChange}
            value={userFormData.category}
          />
        </FormControl>

        <FormControl>
          <TextField
            label="* Size"
            variant="filled"
            onChange={handleInputChange}
            value={userFormData.size}
          />
        </FormControl>

        <FormControl>
          <TextField
            label="* Photo"
            variant="filled"
            onChange={handleInputChange}
            value={userFormData.photo}
          />
        </FormControl>

        <FormControl>
          <TextField
            label="Style"
            variant="filled"
            onChange={handleInputChange}
            value={userFormData.style}
          />
        </FormControl>

        <FormControl>
          <TextField
            label="Brand"
            variant="filled"
            onChange={handleInputChange}
            value={userFormData.brand}
          />
        </FormControl>

        <FormControl>
          <TextField
            label="* Name"
            variant="filled"
            onChange={handleInputChange}
            value={userFormData.name}
          />
        </FormControl>

        <FormControl>
          <TextField select label="Gender" variant="filled">
            {genderDB.map((option) => (
              <MenuItem
                onChange={handleInputChange}
                size="large"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl>
          <TextField
            label="Link"
            variant="filled"
            onChange={handleInputChange}
            value={userFormData.link}
          />
        </FormControl>

        <FormControl>
          <TextField
            label="Color"
            variant="filled"
            onChange={handleInputChange}
            value={userFormData.color}
          />
        </FormControl>

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
