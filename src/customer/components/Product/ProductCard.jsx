import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please sign in or create an account to add items to your cart.');
      navigate('/signin');
      return;
    }


    addToCart(product);
    console.log(`Added product ${product.name} to cart`);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
        </div>
      </Link>

      <div className="product-actions">
        <p className="product-price">₹{product.price}</p>

        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;