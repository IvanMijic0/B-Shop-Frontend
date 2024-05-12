// src/pages/ProductPage.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import products from '../../data/data';
import Gallery from "./Gallery";
import Description from "./Description";
import MobileGallery from "./MobileGallery";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        productId: product.id, name: product.name, price: product.price,
        quantity: 0
      }));
    }
  };
  const [quant, setQuant] = useState(0);
  const [orderedQuant, setOrderedQuant] = useState(0);

  const addQuant = () => {
    setQuant(quant + 1);
  };

  const removeQuant = () => {
    setQuant(quant - 1);
  };

  const resetQuant = () => {
    setQuant(0);
    setOrderedQuant(0);
  };

  const handleBuyNow = () => {
    handleAddToCart();  
    navigate('/checkout');  
  };

  return (
    <div>
      <Gallery />
          <MobileGallery />
          <Description
            onQuant={quant}
            onAdd={addQuant}
            onRemove={removeQuant}
            onSetOrderedQuant={setOrderedQuant}
          />
      {/* {product ? (
        <div>
          <h1>{product.name}</h1>
          <img src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleBuyNow}>Buy Now</button>
        </div>
      ) : (
        <p>Product not found</p>
      )} */}
    </div>
  );
}

export default ProductPage;
