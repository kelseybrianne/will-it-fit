// react:
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from '@mui/material';
import { useFormControl } from '@mui/material/FormControl';


// graphQL:
import {useMutation} from '@apollo/client';
import {ADD_ITEM} from '../utils/mutations';
import Auth from '../utils/auth'

const AddItem = () => {

  const [userFormData, setUserFromData] = useState({
    category: '',
    size: '',
    photo: '',
    style: '',
    brand: '',
    name: '',
    gender: '',
    link: '',
    color: '',
    review: ''
  })
const [validated] = useState(false);

const [addItem] =useMutation(ADD_ITEM)

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setUserFromData({...setUserFromData, [name]: value})
  
}

const handFormSubmit = async (event) => {
  event.preventDefault();
  try{
    const {data} = await addItem({
      variables: {... userFormData},
    });
    Auth.addItem(data.addItem.token)
  } catch(e) {
    console.error(e)
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
  review: ''
})

}

  return (
    <div>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Category"
        variant="filled"
      />
      <TextField id="filled-basic" label="Style" variant="filled" />
      <TextField id="filled-basic" label="Brand" variant="filled" />
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Name"
        variant="filled"
      />
      <TextField id="filled-basic" label="Gender" variant="filled" />
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Size"
        variant="filled"
      />
      <TextField id="filled-basic" label="Link" variant="filled" />
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Photo"
        variant="filled"
      />
      <TextField id="filled-basic" label="Color" variant="filled" />
      <TextareaAutosize
      variant="filled"
        aria-label="minimum height"
        minRows={3}
        placeholder="review"
        style={{ width: 300 }}
      />

    </Box>
      <Button variant="contained">Submit Item</Button>
      </div>
  );
}


export default AddItem
