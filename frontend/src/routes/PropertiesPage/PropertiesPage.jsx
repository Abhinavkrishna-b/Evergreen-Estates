import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import FilterBar from '../../components/FilterBar/FilterBar';
import './PropertiesPage.css';

const PropertiesPage = () => {
  // Centralized state for our filters
  const [filters, setFilters] = useState({
    location: 'Salem',
    type: 'any',
    property: 'any',
    minPrice: '',
    maxPrice: '',
    bedroom: ''
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    console.log("Searching with:", filters);
    // Future logic to filter the properties array will go here
  };

  return (
    <div className="properties-layout">

      <Navbar />

      <div className="properties-content">
        
        <div className="properties-list-container">
          <div className="list-header">
            <h2>Search results for <span>{filters.location || "All Locations"}</span></h2>
          </div>

          <FilterBar 
            filters={filters} 
            handleFilterChange={handleFilterChange} 
            onSearch={handleSearch} 
          />

          <div className="property-cards-placeholder">
            <p>Property Cards will render here...</p>
          </div>
        </div>

        <div className="properties-map-container">

           <div className="map-placeholder-bg">
              <p>Map View Area</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default PropertiesPage;