import React, { createContext, useState, useContext, useEffect } from 'react'; // Import useEffect

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    // Initialize state from localStorage, or with an empty array if nothing is stored
    const [wishlistItems, setWishlistItems] = useState(() => {
        const localWishlist = localStorage.getItem('wishlist');
        return localWishlist ? JSON.parse(localWishlist) : [];
    });

    // Use useEffect to save wishlistItems to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]); // Dependency array: re-run effect whenever wishlistItems changes

    const addToWishlist = (product) => {
        // Check if the product is already in the wishlist before adding
        if (!wishlistItems.find(item => item.id === product.id)) {
            // Update state using the functional update form to ensure you have the latest state
            setWishlistItems(prevItems => [...prevItems, product]);
            console.log(`${product.name} added to wishlist`);
        } else {
             console.log(`${product.name} is already in the wishlist`);
        }
    };

    const removeFromWishlist = (productId) => {
        // Filter out the item with the matching ID
        const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
        // Update state
        setWishlistItems(updatedWishlist);
        console.log(`Product with ID ${productId} removed from wishlist`);
    };

     const clearWishlist = () => {
         setWishlistItems([]);
         console.log("Wishlist cleared");
     }


    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

    // Provide wishlistItems state and the functions through the context
    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    // Custom hook to easily consume the WishlistContext
    return useContext(WishlistContext);
};