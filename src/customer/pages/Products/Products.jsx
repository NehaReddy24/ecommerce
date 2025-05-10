// src/customer/pages/Products/Products.jsx
import React, { useState } from 'react';
import ProductCard from '../../components/Product/ProductCard';
import Filter from '../../components/Filter/Filter';
import { useParams } from 'react-router-dom';

const allProducts = [
  { id: 1, name: 'Mug', price: 299, category: 'mugs', image: 'https://via.placeholder.com/200', tags: [] , color: 'white', size: 'M', availability: 'in-stock', discount: 0},
  { id: 2, name: 'New Lamp', price: 999, category: 'lamps', image: 'https://via.placeholder.com/200', tags: ['new-arrivals'] , color: 'gold', size: 'L', availability: 'in-stock', discount: 10},
  { id: 3, name: 'Accessories Set', price: 699, category: 'accessories', image: 'https://via.placeholder.com/200', tags: ['best-sellers'] , color: 'silver', size: 'S', availability: 'out-of-stock', discount: 20},
  { id: 4, name: 'Book', price: 499, category: 'books', image: 'https://via.placeholder.com/200', tags: [] , color: 'beige', size: 'M', availability: 'in-stock', discount: 5},
  { id: 5, name: 'Photo Frame', price: 599, category: 'photo frames', image: 'https://via.placeholder.com/200', tags: [] , color: 'black', size: 'L', availability: 'in-stock', discount: 0},
  { id: 6, name: 'Party Props (Offer)', price: 199, category: 'party props', image: 'https://via.placeholder.com/200', tags: ['offers-deals'] , color: 'red', size: 'S', availability: 'in-stock', discount: 15},
  { id: 7, name: 'Figurine', price: 1499, category: 'figurines', image: 'https://via.placeholder.com/200', tags: [] , color: 'white', size: 'M', availability: 'out-of-stock', discount: 0},
  { id: 8, name: 'Chocolate Box', price: 899, category: 'chocolates & gourmet', image: 'https://via.placeholder.com/200', tags: [] , color: 'brown', size: 'N/A', availability: 'in-stock', discount: 25},
  { id: 9, name: 'Soft Toy (New)', price: 799, category: 'soft toys', image: 'https://via.placeholder.com/200', tags: ['new-arrivals'] , color: 'pink', size: 'S', availability: 'in-stock', discount: 0},
  { id: 10, name: 'Vase (Best Seller)', price: 1199, category: 'vases', image: 'https://via.placeholder.com/200', tags: ['best-sellers'] , color: 'blue', size: 'L', availability: 'in-stock', discount: 10},
  { id: 11, name: 'Another Mug (Offer)', price: 349, category: 'mugs', image: 'https://via.placeholder.com/200', tags: ['offers-deals'] , color: 'white', size: 'M', availability: 'in-stock', discount: 30},
  { id: 12, name: 'Cool Gadget', price: 1299, category: 'accessories', image: 'https://via.placeholder.com/200', tags: ['new-arrivals'] , color: 'black', size: 'L', availability: 'in-stock', discount: 0},
];

const Products = ({ category }) => {
  const { category: urlCategory } = useParams();
  const currentCategory = category || urlCategory;
  const [filters, setFilters] = useState({ color: [], size: [], priceRange: { min: '', max: '' }, discountRange: { min: '', max: '' }, availability: [] });
  const [sortBy, setSortBy] = useState('');

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = !currentCategory || product.tags?.includes(currentCategory.replace('-', ' '));
    const colorMatch = filters.color.length === 0 || filters.color.includes(product.color);
    const sizeMatch = filters.size.length === 0 || filters.size.includes(product.size);
    const priceMatch =
      (filters.priceRange.min === '' || product.price >= parseFloat(filters.priceRange.min)) &&
      (filters.priceRange.max === '' || product.price <= parseFloat(filters.priceRange.max));
    const discountMatch =
      (filters.discountRange.min === '' || product.discount >= parseFloat(filters.discountRange.min)) &&
      (filters.discountRange.max === '' || product.discount <= parseFloat(filters.discountRange.max));
    const availabilityMatch = filters.availability.length === 0 || filters.availability.includes(product.availability);

    return categoryMatch && colorMatch && sizeMatch && priceMatch && discountMatch && availabilityMatch;
  }).sort((a, b) => {
    if (sortBy === 'price-low-to-high') {
      return a.price - b.price;
    } else if (sortBy === 'price-high-to-low') {
      return b.price - a.price;
    } else if (sortBy === 'discount-high-to-low') {
      return b.discount - a.discount;
    }
    return 0;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {currentCategory
          ? currentCategory.replace('-', ' ').replace('arrivals', 'Arrivals').replace('sellers', 'Sellers').replace('deals', 'Deals')
          : 'All Products'}
      </h2>

      <div className="flex">
        <aside className="w-1/4 pr-6">
          <Filter filters={filters} onFilterChange={handleFilterChange} allProducts={allProducts} />
        </aside>
        <main className="w-3/4">
          <div className="flex justify-end mb-4">
            <label htmlFor="sort" className="mr-2">Sort By:</label>
            <select id="sort" value={sortBy} onChange={handleSortChange} className="border rounded">
              <option value="">Default</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="discount-high-to-low">Discount: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className="col-span-3 text-center text-gray-500">No products match the current criteria.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;