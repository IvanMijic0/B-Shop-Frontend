// src/pages/ProductPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import products from '../data/data'; // Adjust the path as needed

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

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div>
      {product ? (
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
      )}
    </div>
  );
}

export default ProductPage;
