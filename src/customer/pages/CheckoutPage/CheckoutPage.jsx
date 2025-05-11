import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css'; // Ensure this import is present

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const { isAuthenticated, user } = useAuth();

  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calculateSubtotal = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const subtotal = calculateSubtotal();

  const handleContinueToPayment = (e) => {
    e.preventDefault();

    if (!shippingAddress.fullName || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode || !shippingAddress.country || !shippingAddress.phoneNumber) {
      alert('Please fill in all required shipping information.');
      return;
    }

    console.log("Shipping Address Submitted:", shippingAddress);
    console.log("Cart Items:", cart);

    alert("Shipping information captured. Proceeding to next step (not implemented yet).");
  };

  useEffect(() => {
      if (cart.length === 0) {
          navigate('/cart');
      }
  }, [cart, navigate]);


  return (
    <div className="checkout-container container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* Added checkout-container class */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
        <form onSubmit={handleContinueToPayment}>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="fullName" id="fullName" value={shippingAddress.fullName} onChange={handleInputChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
              <input type="text" name="addressLine1" id="addressLine1" value={shippingAddress.addressLine1} onChange={handleInputChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
              <input type="text" name="addressLine2" id="addressLine2" value={shippingAddress.addressLine2} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" name="city" id="city" value={shippingAddress.city} onChange={handleInputChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
              <input type="text" name="state" id="state" value={shippingAddress.state} onChange={handleInputChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal code</label>
              <input type="text" name="postalCode" id="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input type="text" name="country" id="country" value={shippingAddress.country} onChange={handleInputChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" name="phoneNumber" id="phoneNumber" value={shippingAddress.phoneNumber} onChange={handleInputChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>

      <div className="order-summary-box lg:col-span-1 bg-gray-50 rounded-lg p-6 h-fit sticky top-24"> {/* Added order-summary-box class */}
        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
        <div className="border-b border-gray-200 pb-4 mb-4">
            {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
            ))}
        </div>
        <div className="subtotal flex justify-between text-base font-medium text-gray-900 mb-4"> {/* Added subtotal class */}
          <p>Subtotal</p>
          <p>₹{subtotal}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated in the next step.</p>
      </div>
    </div>
  );
};

export default CheckoutPage;