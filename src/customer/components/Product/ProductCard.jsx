import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}> {/* Assuming 'product.id' is your unique identifier */}
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
        </div>
      </Link>
      <div className="product-details"> {/* Move price and button here if you only want image/name to be clickable */}
        <p className="product-price">${product.price}</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;