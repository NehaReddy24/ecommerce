import React, { useContext, useEffect, useState } from 'react';
import './ProductDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function ProductDetail({ product }) {
   const { addToCart } = useContext(CartContext);
   const { addToWishlist, isInWishlist, removeFromWishlist } = useContext(WishlistContext);

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

   const [isProductInWishlist, setIsProductInWishlist] = useState(false);

   useEffect(() => {
       if (product) {
           setIsProductInWishlist(isInWishlist(product.id));
       }
   }, [product, isInWishlist]);


   if (!product) {
     return <div className="product-detail-placeholder">Loading or product not available...</div>;
   }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
        alert('Please sign in or create an account to add items to your cart.');
        navigate('/signin');
        return;
    }

    const quantityInput = document.getElementById('quantity');
    const selectedQuantity = parseInt(quantityInput ? quantityInput.value : '1', 10);

    addToCart(product, selectedQuantity);
    console.log(`Added ${selectedQuantity} of product ${product.name} to cart`);
  };

  const handleToggleWishlist = () => {
      if (isProductInWishlist) {
          removeFromWishlist(product.id);
      } else {
          addToWishlist(product);
      }
  };


  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.imageUrl || '/placeholder.jpg'} alt={product.name} />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">₹{product.price}</p>
        <p className="product-description">{product.description}</p>

        <div className="product-actions">
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" defaultValue="1" min="1" />
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
          </button>
          <button
              className={`add-to-wishlist-button ${isProductInWishlist ? 'in-wishlist' : ''}`}
              onClick={handleToggleWishlist}
          >
              <FontAwesomeIcon icon={faHeart} style={{ color: isProductInWishlist ? 'red' : 'inherit' }} />
               {isProductInWishlist ? ' In Wishlist' : ' Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;