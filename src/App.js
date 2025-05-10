// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navigation from './customer/components/Navigation/Navigation';
import HomePage from './customer/pages/HomePages/HomePage';
import Products from './customer/pages/Products/Products';
import ProductPage from './customer/pages/ProductPage/ProductPage';
import CartPage from './customer/pages/CartPage/CartPage';
import { CartProvider } from './customer/context/CartContext';
import { WishlistProvider } from './customer/context/WishlistContext';
import WishlistPage from './customer/pages/WishlistPage/WishlistPage'; // Import WishlistPage

function App() {
    return (
        <Router>
            <div className="bg-gray-100 min-h-screen">
                <CartProvider>
                    <WishlistProvider>
                        <Navigation />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:category" element={<ProductCategoryPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/wishlist" element={<WishlistPage />} /> {/* Add WishlistPage route */}
                        </Routes>
                    </WishlistProvider>
                </CartProvider>
            </div>
        </Router>
    );
}

// Create a wrapper component to access the category parameter
function ProductCategoryPage() {
    const { category } = useParams();
    return <Products category={category} />;
}

// Create a wrapper component to access the product ID parameter
function ProductDetailPage() {
    const { id } = useParams();
    return <ProductPage productId={id} />;
}

export default App;