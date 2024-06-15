import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, Card, CardActionArea,
  CardMedia, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddNewProductOnSaleModal from './modal/AddNewProductOnSaleModal';

import products from '../data/data';
import categories from '../data/categories';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MainPage = () => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const subcategoryToCategoryMap: { [key: number]: number } = {};
  categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      subcategoryToCategoryMap[subcategory.id] = category.id;
    });
  });

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategories]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(subcategoryToCategoryMap[p.subcategoryId]));
    }

    if (searchTerm) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (event) => {
    const { target: { value } } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',').map(Number) : value
    );
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div style={{ margin: 'auto', maxWidth: 1280, padding: '20px' }}>
      <TextField
        fullWidth
        label="Search for products"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchTermChange}
        style={{ marginBottom: 20 }}
      />
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="categories-checkbox-label">Categories</InputLabel>
        <Select
          labelId="categories-checkbox-label"
          id="categories-checkbox"
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) => selected.map(id => categories.find(cat => cat.id === id)?.name).join(', ')}
          MenuProps={MenuProps}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              <Checkbox checked={selectedCategories.indexOf(category.id) > -1} />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleOpenModal}>Add your product</Button>
      <AddNewProductOnSaleModal open={open} handleClose={handleCloseModal} />
      <Grid container spacing={4} justifyContent="center">
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: 'contain', padding: 1 }}
                  image={product.images[0]}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="textPrimary">
                    ${product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MainPage;
