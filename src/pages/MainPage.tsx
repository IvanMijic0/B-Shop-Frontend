import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Grid, Card, CardActionArea,
  CardMedia, CardContent, CardActions
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import  products  from '../data'; 
import { useNavigate } from 'react-router-dom';


interface Product {
  id: number;
  name: string;
  description: string;
  price: string;  
  image: string;
}

const MainPage = () => {
    const navigate = useNavigate();
  
    const handleCardClick = (productId) => {
      navigate(`/product/${productId}`);
    };
  
    return (
      <div style={{ margin: 'auto', maxWidth: 1280, padding: '20px' }}> 
        <Grid container spacing={4} justifyContent="center"> 
          {products.map((product: Product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <CardActionArea onClick={() => handleCardClick(product.id)}>
                <CardMedia
                  component="img"
                  sx={{
                    height: 200, 
                    objectFit: 'contain', 
                    padding: 1 
                  }}
                  image={product.image}
                  alt={product.name}
                  title={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="textPrimary">
                    {product.price}
                  </Typography>
                </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }


export default MainPage;
