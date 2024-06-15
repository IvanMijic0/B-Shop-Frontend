import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { fetchProducts } from '../../store/productSlice';
import { RootState } from '../../store';
import Gallery from "./Gallery";
import Description from "./Description";
import MobileGallery from "./MobileGallery";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const images = product.image_url ? (Array.isArray(product.image_url) ? product.image_url : [product.image_url]) : [];

  return (
    <div className='product-page-con'>
      <Gallery
        images={images}
      />
      <MobileGallery
        images={images}
      />
      <Description
        productDetails={product}
        onQuant={quant}
        onAdd={addQuant}
        onRemove={removeQuant}
        onSetOrderedQuant={setOrderedQuant}
        handleBuyNow={() => handleBuyNow(quant)}
        handleAddToCart={() => handleAddToCart(quant)}
      />
    </div>
  );
}

export default ProductPage;
