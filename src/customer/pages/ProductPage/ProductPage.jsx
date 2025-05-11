import React, { useEffect, useState } from 'react';
import ProductDetail from '../../components/ProductDetail/ProductDetail';

// --- Simulated Product Data (Replace with your actual data source or API call) ---
const dummyProducts = [
  {
    id: 'gadget-1',
    name: 'Awesome Electronic Gadget',
    description: 'This is the **unique and detailed description** specifically for the Awesome Electronic Gadget. It features advanced technology, a sleek design, and incredible performance. Perfect for tech enthusiasts!',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/400?text=Gadget+1+Detail',
  },
  {
    id: 'book-1',
    name: 'Classic Novel',
    description: 'A timeless classic. This novel tells a compelling story that will keep you hooked from beginning to end. A must-read!',
    price: 15.00,
    imageUrl: 'https://via.placeholder.com/400?text=Book+1+Detail',
  },
  {
    id: 'lamp-1',
    name: 'Stylish Desk Lamp',
    description: 'Illuminate your workspace with this **stylish and functional desk lamp**. Its modern design complements any decor, while the adjustable arm and brightness settings provide perfect lighting for reading or work.',
    price: 45.50,
    imageUrl: 'https://via.placeholder.com/400?text=Lamp+1+Detail',
  },
  // Add more product objects here with their own unique descriptions and details
];
// -----------------------------------------------------------------------------

// --- Define a default product to show when a product is not found ---
const defaultProduct = {
    id: 'default', // A unique ID for the default product
    name: 'Default Product',
    description: 'This is a default product description because the requested product was not found.',
    price: 0.00,
    imageUrl: 'https://via.placeholder.com/400?text=Product+Not+Found', // A default placeholder image
    // Add other default properties if needed
};
// -----------------------------------------------------------------


function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  // We will no longer use a separate 'error' state for 'Product not found'

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Set loading to true when fetching starts

      const foundProduct = dummyProducts.find(p => p.id === productId);

      // Simulate a small delay
      await new Promise(resolve => setTimeout(resolve, 300));

      if (foundProduct) {
        // If product is found, set it in state
        setProduct(foundProduct);
      } else {
        // If product is NOT found, set the default product in state
        setProduct(defaultProduct);
        // Optionally, you could still log a message to the console
        console.warn(`Product with ID ${productId} not found. Displaying default product.`);
      }

      setLoading(false); // Set loading to false after search/fetch
    };

    fetchProduct();

  }, [productId]); // Dependency array: re-run effect whenever productId changes

  // --- Render based on loading and product state ---
  if (loading) {
    return <div className="product-loading">Loading product...</div>; // Display loading message while loading
  }

  // We no longer explicitly check for '!product' to show a 'not found' message here,
  // because 'product' will either be the found product or the defaultProduct.

  return (
    <div className="product-page-container"> {/* Added a container class for styling */}
      {/* Pass the fetched product object (or the defaultProduct) to ProductDetail */}
      <ProductDetail product={product} />
    </div>
  );
}

export default ProductPage;