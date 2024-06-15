import React from 'react';
import { UploadButton } from '@bytescale/upload-widget-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { AddNewProductOnSaleModalProps } from '../../utils/type'

const options = {
  apiKey: import.meta.env.VITE_BYTESCALE_SECRETAPI_KEY,
  maxFileCount: 10,
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const AddNewProductOnSaleModal: React.FC<AddNewProductOnSaleModalProps> = ({ open, handleClose }) => (

  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="add-new-product-modal-title"
    aria-describedby="add-new-product-modal-description"
  >
    <Box sx={style}>
      <Typography id="add-new-product-modal-title" variant="h6" component="h2">
        Add New Product
      </Typography>
      <Typography id="add-new-product-modal-description" sx={{ mt: 2 }}>
        <UploadButton
          options={options}
          onComplete={(files) => alert(files.map((x) => x.fileUrl).join("\n"))}
        >
          {({ onClick }) => <button onClick={onClick}>Upload a file...</button>}
        </UploadButton>
      </Typography>
    </Box>
  </Modal>
);

export default AddNewProductOnSaleModal;
