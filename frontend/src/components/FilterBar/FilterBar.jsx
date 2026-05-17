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
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </div>
      </div>

      <div className="filter-bottom">
        <div className="filter-item">
          <label>
            <FiFilter className="filter-icon" /> Purpose
          </label>
          <select value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)}>
            <option value="any">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        
        <div className="filter-item">
          <label>
            <FiHome className="filter-icon" /> Property Type
          </label>
          <select value={filters.property} onChange={(e) => handleFilterChange('property', e.target.value)}>
            <option value="any">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="land">Land</option>
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
            value={filters.bedroom}
            onChange={(e) => handleFilterChange('bedroom', e.target.value)}
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