import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useFormControl } from '@mui/material/FormControl';

export default function Closet() {
  return (
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
      <TextField id="filled-basic" label="Review" variant="filled" />

      <Button variant="contained">Submit Item</Button>
    </Box>
  );
}

