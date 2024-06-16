import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, Card, CardActionArea,
  CardMedia, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText,
  Button, CircularProgress,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchProducts, fetchCategories } from '../store/productSlice';
import AddNewProductOnSaleModal from './modal/AddNewProductOnSaleModal';
import { Product } from '../utils/type';

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

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error: productsError } = useSelector((state: RootState) => state.products);
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state: RootState) => state.categories);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategories, products]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const filterProducts = () => {
    let filtered = products;
  
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => {
        const categoryId = p.category_id;
        const isSelectedCategory = categoryId !== undefined && selectedCategories.includes(categoryId);
        return isSelectedCategory;
      });
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

  if (productsLoading || categoriesLoading) {
    return <CircularProgress sx={{ margin: 'auto', display: 'block', justifyContent: 'center', alignItems: 'center' }} />;
  }

  if (productsError) {
    return (
      <Snackbar slot="span">
        <Typography>{productsError}</Typography>
      </Snackbar>
    );
  }

  if (categoriesError) {
    return (
      <Snackbar slot="span">
        <Typography>{categoriesError}</Typography>
      </Snackbar>
    );
  }

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
                  image={product.image_url}
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