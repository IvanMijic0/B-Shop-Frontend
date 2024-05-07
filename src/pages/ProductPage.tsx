import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data'; // Adjust the path as needed

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default ProductPage;
