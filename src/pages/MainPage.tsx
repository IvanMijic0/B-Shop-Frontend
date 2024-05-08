import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Grid, Card, CardActionArea,
  CardMedia, CardContent, TextField
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import products from '../data/data'; 
import categories from '../data/categories'; // Assuming you have this
import { useNavigate } from 'react-router-dom';
import { Product, Category, Subcategory } from '../utils/type';  



const MainPage = () => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');

  const subcategoryToCategoryMap: { [key: number]: number } = {}; // This tells TypeScript how the object is structured
  categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      subcategoryToCategoryMap[subcategory.id] = category.id;
    });
  });

  const filterByCategory = (categoryId: number) => {
    console.log("Filtering by category:", categoryId);
  
    const category = categories.find(category => category.id === categoryId);
    console.log("Selected category:", category);
  
    if (!category) return; // Handle the case when category is not found
    
    const subcategoryIds = category.subcategories.map(sc => sc.id);
    console.log("Subcategory IDs:", subcategoryIds);
  
    // Filter products based on these subcategory IDs
    if (subcategoryIds) {
      const filtered = products.filter(p => subcategoryIds.includes(p.subcategoryId));
      console.log("Filtered products:", filtered);
      setFilteredProducts(filtered);
    } else {
      console.log("No subcategories found");
      setFilteredProducts(products);
    }
  };
  
  

  return (
    <div style={{ margin: 'auto', maxWidth: 1280, padding: '20px' }}>
      <TextField
          fullWidth
          label="Search for products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: 20 }}
      />
      <div>
        {categories.map(category => (
            <React.Fragment key={category.id}>
                <Button variant="outlined" color="primary" onClick={() => filterByCategory(category.id)}>
                    {category.name}
                </Button>
            </React.Fragment>
        ))}
      </div>
      <Grid container spacing={4} justifyContent="center"> 
        {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.subcategoryId}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
                        <CardMedia
                            component="img"
                            sx={{ height: 200, objectFit: 'contain', padding: 1 }}
                            image={product.image}
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