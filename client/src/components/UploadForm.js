import React from 'react';
import { styled } from '@mui/material/styles';
// eslint-disable-next-line no-unused-vars
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { UPLOAD_FILE } from '../utils/mutations.js';

// export default function UploadForm() {
//   const [uploadFile] = useMutation(UPLOAD_FILE, {
//     onCompleted: (data) => console.log(data),
//   });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       return
//     }
//     console.log(file)
//     uploadFile({ variables: { file } });
//     }

//   return (
//     <div>
//       <h1> Upload File</h1>
//       <input type="file" onChange={handleFileChange} />
//     </div>
//   );
// }

const UploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: 'none' }}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </Box>
      )}
    </>
  );
};

export default UploadForm;
//       {/* Below is the 'camera icon' to click for uploads */}
//       <label htmlFor="icon-button-file">
//         <Input accept="image/*" id="icon-button-file" type="file" />
//         {/* change camera color button example:  sx={{ color: pink[500] }} */}
//         <IconButton size="large" aria-label="upload picture" component="span">
//           <AddAPhotoOutlinedIcon fontSize="large" />
//         </IconButton>
//       </label>
//     </Stack>
//   );
// }
