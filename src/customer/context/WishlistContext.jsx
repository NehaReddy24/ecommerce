// src/customer/context/WishlistContext.jsx
import React, { createContext, useState, useContext } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const addToWishlist = (product) => {
        if (!wishlistItems.find(item => item.id === product.id)) {
            setWishlistItems([...wishlistItems, product]);
            console.log(`${product.name} added to wishlist`);
        }
    };

    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
        setWishlistItems(updatedWishlist);
        console.log(`Product with ID ${productId} removed from wishlist`);
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(WishlistContext);
};