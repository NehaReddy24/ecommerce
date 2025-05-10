// src/customer/pages/WishlistPage/WishlistPage.jsx
import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import './WishlistPage.css'; // Import CSS for styling

const WishlistPage = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();

    const handleRemove = (productId) => {
        removeFromWishlist(productId);
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="wishlist-empty-container">
                <h1 className="wishlist-title">Your Wishlist</h1>
                <p className="wishlist-empty-message">Your wishlist is currently empty.</p>
                <Link to="/products" className="wishlist-browse-link">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="wishlist-container">
            <h1 className="wishlist-title">Your Wishlist</h1>
            <ul className="wishlist-grid">
                {wishlistItems.map(product => (
                    <li key={product.id} className="wishlist-item">
                        <Link to={`/product/${product.id}`} className="wishlist-item-link">
                            <img src={product.imageUrl || '/placeholder.jpg'} alt={product.name} className="wishlist-item-image" />
                            <div className="wishlist-item-details">
                                <h3 className="wishlist-item-name">{product.name}</h3>
                                <p className="wishlist-item-price">${product.price}</p>
                            </div>
                        </Link>
                        <button
                            onClick={() => handleRemove(product.id)}
                            className="wishlist-remove-button"
                        >
                            <XMarkIcon className="wishlist-remove-icon" aria-label={`Remove ${product.name} from wishlist`} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WishlistPage;