import React from 'react';
import './ProductDetail.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Import icons

function ProductDetail({ productId }) { // Now receiving productId as prop
  // In a real application, you'd fetch the product data using productId
  const product = {
    id: productId, // Use the received productId
    name: 'Awesome Electronic Gadget',
    description: 'This is a fantastic electronic gadget with amazing features. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/400', // Placeholder image URL
    // Add more product details as needed (e.g., specifications, images, reviews)
  };

  const handleAddToCart = () => {
    console.log(`Added product ${product.id} to cart`);
    // Implement your add to cart logic here
  };

  const handleAddToWishlist = () => {
    console.log(`Added product ${product.id} to wishlist`);
    // Implement your add to wishlist logic here
  };

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
        {/* You could add image thumbnails here if you have multiple images */}
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>

        <div className="product-actions">
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" value="1" min="1" />
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
          </button>
          <button className="add-to-wishlist-button" onClick={handleAddToWishlist}>
            <FontAwesomeIcon icon={faHeart} /> Add to Wishlist
          </button>
        </div>
        {/* You can add more product details, like specifications, reviews, etc., here */}
      </div>
    </div>
  );
}

export default ProductDetail;