import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import './CartPage.css';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        updateQuantity(productId, parseInt(newQuantity, 10));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    if (cart.length === 0) {
        return (
            <div className="cart-empty-container">
                <h1 className="cart-title">Your Cart</h1>
                <p className="cart-empty-message">Your cart is currently empty.</p>
                <Link to="/products" className="cart-browse-link">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your Cart</h1>
            <ul className="cart-items-list">
                {cart.map(item => (
                    <li key={item.id} className="cart-item">
                        <Link to={`/product/${item.id}`} className="cart-item-link">
                            <img src={item.imageUrl || '/placeholder.jpg'} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3 className="cart-item-name">{item.name}</h3>
                                <p className="cart-item-price">₹{item.price}</p>
                            </div>
                        </Link>
                        <div className="cart-item-quantity">
                            <label htmlFor={`quantity-${item.id}`} className="sr-only">
                                Quantity
                            </label>
                            <input
                                id={`quantity-${item.id}`}
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                className="cart-quantity-input"
                            />
                        </div>
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="cart-remove-button"
                        >
                            <XMarkIcon className="cart-remove-icon" aria-label={`Remove ${item.name} from cart`} />
                        </button>
                    </li>
                ))}
            </ul>
            <div className="cart-summary">
                <p className="cart-subtotal">Subtotal: ₹{calculateTotal()}</p> {/* Corrected currency symbol */}
                <Link to="/checkout" className="cart-checkout-button">Proceed to Checkout</Link>
            </div>
        </div>
    );
};

export default CartPage;