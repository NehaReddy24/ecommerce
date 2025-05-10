import React from 'react';
import ProductDetail from '../../components/ProductDetail/ProductDetail';

function ProductPage() {
  return (
    <div>
      <h1>Product Details</h1>
      <ProductDetail />
      {/* You might pass a product ID as a prop here or fetch it based on the URL */}
    </div>
  );
}

export default ProductPage;