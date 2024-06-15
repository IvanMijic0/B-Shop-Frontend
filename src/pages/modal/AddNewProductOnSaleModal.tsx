import React, { useState, useEffect } from 'react';
import { UploadButton } from '@bytescale/upload-widget-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { fetchCategories } from '../../store/productSlice';
import { AddNewProductOnSaleModalProps } from '../../utils/type';
import { getUserFromToken } from '../../utils/getUserFromToken';
import { CircularProgress, Snackbar } from '@mui/material';

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

const AddNewProductOnSaleModal: React.FC<AddNewProductOnSaleModalProps> = ({ open, handleClose }) => {
  const user = getUserFromToken();
  const dispatch = useAppDispatch();
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state: RootState) => state.categories);

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (open && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, open, categories.length]);

  const handleUploadComplete = (files: { fileUrl: string }[]) => {
    setImages(files.map(file => file.fileUrl));
  };

  const handleSubmit = () => {
    const newProduct = {
      name: productName,
      description,
      price: parseFloat(price),
      images,
      category_id: selectedCategory,
      user_id: user?.id,
    };
    console.log(newProduct);
    // TODO: Add new product to the database.
  };

  if (categoriesLoading) {
    return <CircularProgress sx={{ margin: 'auto', display: 'block', justifyContent: 'center', alignItems: 'center' }} />;
  }

  if (categoriesError) {
    return (
    <Snackbar slot="span">
      <Typography>{categoriesError}</Typography>
    </Snackbar>)
  }

  return (
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
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <UploadButton
            options={options}
            onComplete={handleUploadComplete}
          >
            {({ onClick }) => <Button variant="contained" onClick={onClick}>Upload Image</Button>}
          </UploadButton>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddNewProductOnSaleModal;
