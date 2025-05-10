// src/customer/components/HomeSectionCard/HomeSectionCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { HeartIcon as OutlineHeart } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeart } from '@heroicons/react/24/solid';
import './HomeSectionCard.css';

function HomeSectionCard({ product, image, title, description }) {
    const { addToCart } = useContext(CartContext);
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isItemInWishlist = isInWishlist(product?.id);

    const handleAddToCartClick = () => {
        if (product && product.id) {
            addToCart(product);
            console.log(`${product.name} added to cart.`);
        } else {
            console.warn("Attempted to add an invalid product to cart:", product);
        }
    };

    const handleWishlistClick = () => {
        if (product && product.id) {
            if (isItemInWishlist) {
                removeFromWishlist(product.id);
            } else {
                addToWishlist(product);
            }
        }
    };

    return (
        <div className="home-section-card">
            {product && product.id ? (
                <>
                    <div className="relative">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.imageUrl || 'placeholder.jpg'} alt={product.name || 'Product Image'} />
                            <h3>{product.name || 'Product Name'}</h3>
                            <p>${product.price || 'Price'}</p>
                        </Link>
                        <button
                            onClick={handleWishlistClick}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md focus:outline-none"
                        >
                            {isItemInWishlist ? (
                                <SolidHeart className="h-5 w-5 text-red-500" aria-label={`Remove ${product.name} from wishlist`} />
                            ) : (
                                <OutlineHeart className="h-5 w-5 text-gray-400 hover:text-red-500" aria-label={`Add ${product.name} to wishlist`} />
                            )}
                        </button>
                    </div>
                    <button onClick={handleAddToCartClick} className="add-to-cart-button mt-2">
                        Add to Cart
                    </button>
                </>
            ) : (
                <div className="category-card">
                    <img src={image || '/placeholder.jpg'} alt={title || 'Category Image'} className="category-image" />
                    <h3 className="category-title">{title || 'Category Title'}</h3>
                    <p className="category-description">{description || 'Category Description'}</p>
                    <Link to={`/products?category=${title?.toLowerCase()?.replace(/ /g, '-')}`} className="browse-category-button">
                        Browse {title}
                    </Link>
                </div>
            )}
        </div>
    );
}

export default HomeSectionCard;