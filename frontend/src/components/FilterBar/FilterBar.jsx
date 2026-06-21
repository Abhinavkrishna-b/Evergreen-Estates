import { FiSearch, FiMapPin, FiFilter, FiHome, FiTrendingUp, FiMaximize2 } from 'react-icons/fi';
import './FilterBar.css';

const FilterBar = ({ filters, handleFilterChange, onSearch }) => {
  return (
    <div className="filter-bar">

      <div className="filter-top">
        <div className="filter-item full-width">
          <label>
            <FiMapPin className="filter-icon" /> Location
          </label>
          <input
            type="text"
            placeholder="City Location"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
          />
        </div>
      </div>

      <div className="filter-bottom">
        <div className="filter-item">
          <label>
            <FiFilter className="filter-icon" /> Purpose
          </label>
          <select value={filters.purpose} onChange={(e) => handleFilterChange('purpose', e.target.value)}>
            <option value="Any">Any</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
        
        <div className="filter-item">
          <label>
            <FiHome className="filter-icon" /> Property Type
          </label>
          <select value={filters.propertyType} onChange={(e) => handleFilterChange('propertyType', e.target.value)}>
            <option value="Any">Any</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Land">Land</option>
            <option value="Agriculture Land">Agriculture Land</option>
          </select>
        </div>
        
        <div className="filter-item">
          <label>
            <FiTrendingUp className="filter-icon" /> Min Price
          </label>
          <input
            type="number"
            placeholder="Any"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          />
        </div>
        
        <div className="filter-item">
          <label>
            <FiTrendingUp className="filter-icon" /> Max Price
          </label>
          <input
            type="number"
            placeholder="Any"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          />
        </div>
        
        <div className="filter-item">
          <label>
            <FiMaximize2 className="filter-icon" /> Bedroom
          </label>
          <input
            type="number"
            placeholder="Any"
            value={filters.beds}
            onChange={(e) => handleFilterChange('beds', e.target.value)}
          />
        </div>
        
        {/* Search Button */}
        <button className="filter-search-btn" onClick={onSearch}>
          <FiSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;