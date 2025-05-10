// src/customer/components/Filter/Filter.jsx
import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ filters, onFilterChange, allProducts }) => {
  const [expandedFilters, setExpandedFilters] = useState({});

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    onFilterChange(filterType, updatedValues);
  };

  const handlePriceChange = (type, value) => {
    onFilterChange('priceRange', { ...filters.priceRange, [type]: value });
  };

  const handleDiscountChange = (type, value) => {
    onFilterChange('discountRange', { ...filters.discountRange, [type]: value });
  };

  const availableColors = [...new Set(allProducts.map(p => p.color).filter(Boolean))].sort();
  const availableSizes = [...new Set(allProducts.map(p => p.size).filter(Boolean))].sort();
  const availableAvailability = [...new Set(allProducts.map(p => p.availability).filter(Boolean))].sort();

  return (
    <div className="filter-section">
      <h3 className="filter-section-title">Filters</h3>

      <div className="filter-group">
        <div className="filter-header" onClick={() => toggleFilter('Color')}>
          <span>Color</span>
          <span className="expand-icon">{expandedFilters['Color'] ? '-' : '+'}</span>
        </div>
        {expandedFilters['Color'] && (
          <div className="filter-options">
            {availableColors.map(color => (
              <label key={color} className="filter-option-label">
                <input
                  type="checkbox"
                  value={color}
                  checked={filters.color?.includes(color)}
                  onChange={() => handleCheckboxChange('color', color)}
                />
                {color}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-group">
        <div className="filter-header" onClick={() => toggleFilter('Size')}>
          <span>Size</span>
          <span className="expand-icon">{expandedFilters['Size'] ? '-' : '+'}</span>
        </div>
        {expandedFilters['Size'] && (
          <div className="filter-options">
            {availableSizes.map(size => (
              <label key={size} className="filter-option-label">
                <input
                  type="checkbox"
                  value={size}
                  checked={filters.size?.includes(size)}
                  onChange={() => handleCheckboxChange('size', size)}
                />
                {size}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-group">
        <div className="filter-header" onClick={() => toggleFilter('Price')}>
          <span>Price</span>
          <span className="expand-icon">{expandedFilters['Price'] ? '-' : '+'}</span>
        </div>
        {expandedFilters['Price'] && (
          <div className="filter-options">
            <div className="price-range-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange?.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="price-input"
              />
              <span className="separator">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange?.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="price-input"
              />
            </div>
          </div>
        )}
      </div>

      <div className="filter-group">
        <div className="filter-header" onClick={() => toggleFilter('Discount Range')}>
          <span>Discount Range</span>
          <span className="expand-icon">{expandedFilters['Discount Range'] ? '-' : '+'}</span>
        </div>
        {expandedFilters['Discount Range'] && (
          <div className="filter-options">
            <div className="discount-range-inputs">
              <input
                type="number"
                placeholder="Min (%)"
                value={filters.discountRange?.min}
                onChange={(e) => handleDiscountChange('min', e.target.value)}
                className="price-input"
              />
              <span className="separator">-</span>
              <input
                type="number"
                placeholder="Max (%)"
                value={filters.discountRange?.max}
                onChange={(e) => handleDiscountChange('max', e.target.value)}
                className="price-input"
              />
            </div>
          </div>
        )}
      </div>

      <div className="filter-group">
        <div className="filter-header" onClick={() => toggleFilter('Availability')}>
          <span>Availability</span>
          <span className="expand-icon">{expandedFilters['Availability'] ? '-' : '+'}</span>
        </div>
        {expandedFilters['Availability'] && (
          <div className="filter-options">
            {availableAvailability.map(availability => (
              <label key={availability} className="filter-option-label">
                <input
                  type="checkbox"
                  value={availability}
                  checked={filters.availability?.includes(availability)}
                  onChange={() => handleCheckboxChange('availability', availability)}
                />
                {availability.charAt(0).toUpperCase() + availability.slice(1).replace('-', ' ')}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;