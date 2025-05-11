import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import Navigation from './customer/components/Navigation/Navigation';
import HomePage from './customer/pages/HomePages/HomePage';
import Products from './customer/pages/Products/Products';
import ProductPage from './customer/pages/ProductPage/ProductPage';
import CartPage from './customer/pages/CartPage/CartPage';
import WishlistPage from './customer/pages/WishlistPage/WishlistPage';
import SignInPage from './customer/pages/SignInPage/SignInPage';
import CreateAccountPage from './customer/pages/CreateAccountPage/CreateAccountPage';
import CheckoutPage from './customer/pages/CheckoutPage/CheckoutPage';


import { CartProvider } from './customer/context/CartContext';
import { WishlistProvider } from './customer/context/WishlistContext';
import { AuthProvider } from './customer/context/AuthContext';


function App() {
    return (
        <AuthProvider>
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
                                <Route path="/wishlist" element={<WishlistPage />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/signin" element={<SignInPage />} />
                                <Route path="/create-account" element={<CreateAccountPage />} />
                            </Routes>

                        </WishlistProvider>
                    </CartProvider>
                </div>
            </Router>
        </AuthProvider>
    );
}

function ProductCategoryPage() {
    const { category } = useParams();
    return <Products category={category} />;
}

function ProductDetailPage() {
    const { id } = useParams();
    return <ProductPage productId={id} />;
}

export default App;