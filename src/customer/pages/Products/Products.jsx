import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/Product/ProductCard';
import Filter from '../../components/Filter/Filter';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8080/api';

const Products = ({ category }) => {
  const { category: urlCategory } = useParams();
  const currentCategory = category || urlCategory;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({ color: [], size: [], priceRange: { min: '', max: '' }, discountRange: { min: '', max: '' }, availability: [] });
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = `${API_BASE_URL}/products`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorData}`);
        }

        const data = await response.json();

        console.log("Fetched raw products:", data); // LOG 1: Log the raw data fetched
        setProducts(data);

      } catch (e) {
        setError(`Failed to fetch products: ${e.message}`);
        setProducts([]);
        console.error("Fetching products failed:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredAndSortedProducts = products.filter(product => {
    console.log("Checking product in filter:", product); // LOG 2: Log each product before filtering

    const productHasColor = product && product.color !== undefined && product.color !== null;
    const productHasSize = product && product.size !== undefined && product.size !== null;
    const productHasPrice = product && product.price !== undefined && product.price !== null;
    const productHasDiscount = product && product.discount !== undefined && product.discount !== null;
    const productHasAvailability = product && product.availability !== undefined && product.availability !== null;

    const colorMatch = filters.color.length === 0 || (productHasColor && filters.color.includes(product.color));
    const sizeMatch = filters.size.length === 0 || (productHasSize && filters.size.includes(product.size));

    const minPrice = parseFloat(filters.priceRange.min);
    const maxPrice = parseFloat(filters.priceRange.max);
    const priceMatch =
      (filters.priceRange.min === '' || (productHasPrice && parseFloat(product.price) >= minPrice)) &&
      (filters.priceRange.max === '' || (productHasPrice && parseFloat(product.price) <= maxPrice));

    const minDiscount = parseFloat(filters.discountRange.min);
    const maxDiscount = parseFloat(filters.discountRange.max);
     const discountMatch =
      (filters.discountRange.min === '' || (productHasDiscount && parseFloat(product.discount) >= minDiscount)) &&
      (filters.discountRange.max === '' || (productHasDiscount && parseFloat(product.discount) <= maxDiscount));

     const availabilityMatch = filters.availability.length === 0 || (productHasAvailability && filters.availability.includes(product.availability));


    const isMatch = colorMatch && sizeMatch && priceMatch && discountMatch && availabilityMatch;
    console.log(`Product ${product.id || product.name} - Match: ${isMatch}`, { colorMatch, sizeMatch, priceMatch, discountMatch, availabilityMatch }); // LOG 3: Log filter results
    return isMatch;

  }).sort((a, b) => {
    if (sortBy === 'price-low-to-high') {
      return (a.price || 0) - (b.price || 0);
    } else if (sortBy === 'price-high-to-low') {
      return (b.price || 0) - (a.price || 0);
    } else if (sortBy === 'discount-high-to-low') {
      const discountA = a.discount !== undefined && a.discount !== null ? a.discount : 0;
      const discountB = b.discount !== undefined && b.discount !== null ? b.discount : 0;
      return discountB - discountA;
    }
    return 0;
  });

  console.log("Filtered and sorted products count:", filteredAndSortedProducts.length); // LOG 4: Log the final count


  return (
    <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
             <h2 className="text-2xl font-bold text-gray-900 mb-6">
                 {currentCategory
                    ? `${currentCategory.replace('-', ' ').replace('arrivals', 'Arrivals').replace('sellers', 'Sellers').replace('deals', 'Deals')} Products`
                    : 'All Products'}
            </h2>

             <div className="flex flex-col lg:flex-row">
                <aside className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
                    <Filter filters={filters} onFilterChange={handleFilterChange} allProducts={products} />
                </aside>
                <main className="w-full lg:w-3/4">
                    <div className="flex justify-end mb-4">
                        <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">Sort By:</label>
                        <select id="sort" value={sortBy} onChange={handleSortChange} className="mt-1 block w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="">Default</option>
                            <option value="price-low-to-high">Price: Low to High</option>
                            <option value="price-high-to-low">Price: High to Low</option>
                            <option value="discount-high-to-low">Discount: High to Low</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                        {filteredAndSortedProducts.length > 0 ? (
                            filteredAndSortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">No products match the current criteria.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    </div>
  );
};

export default Products;