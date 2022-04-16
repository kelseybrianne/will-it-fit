import * as React from 'react';
import { styled } from '@mui/material/styles';
// eslint-disable-next-line no-unused-vars
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButtons() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {/* Below is an 'Upload Button' if you prefer it to an icon. */}
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      {/* Below is the 'camera icon' to click for uploads */}
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        {/* change camera color button example:  sx={{ color: pink[500] }} */}
        <IconButton size="large" aria-label="upload picture" component="span">
          <AddAPhotoOutlinedIcon fontSize="large" />
        </IconButton>
      </label>
    </Stack>
  );
}
