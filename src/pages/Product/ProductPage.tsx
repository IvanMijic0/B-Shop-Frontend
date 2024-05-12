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

  const [quant, setQuant] = useState(1);

  const [orderedQuant, setOrderedQuant] = useState(0);

  const handleAddToCart = (quantity: number) => {
    if (product && quantity > 0) {
      dispatch(addToCart({
        productId: product.id, 
        name: product.name, 
        price: product.price,
        quantity
      }));
    }
  };
  
  const handleBuyNow = (quantity: number) => {
    handleAddToCart(quantity);  
    navigate('/checkout');  
  };

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


  return (
    <div className='product-page-con'>
          <Gallery 
            images={product?.images ?? []}
          />
          <MobileGallery 
            images={product?.images ?? []}
          />
          <Description
            productDetails={product}
            onQuant={quant}
            onAdd={addQuant}
            onRemove={removeQuant}
            onSetOrderedQuant={setOrderedQuant}
            handleBuyNow={() => handleBuyNow(quant)}  // Passing quantity directly
            handleAddToCart={() => handleAddToCart(quant)}
          />
    </div>
  );
}

export default ProductPage;
