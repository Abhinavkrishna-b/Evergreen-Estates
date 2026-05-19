import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import FilterBar from '../../components/FilterBar/FilterBar';
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard';
import { featuredProperties } from '../../constants/properties';
import Map from '../../components/Map/Map'
import './PropertiesPage.css';

const PropertiesPage = () => {
  const [filters, setFilters] = useState({
    location: 'Salem',
    type: 'any',
    property: 'any',
    minPrice: '',
    maxPrice: '',
    bedroom: ''
  });

  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const results = featuredProperties.filter((property) => {
      
      const matchLoc = !filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase());
      
      
      const matchPurpose = !filters.type || filters.type === 'any' || property.purpose === filters.type;
      
      
      const matchProp = !filters.property || filters.property === 'any' || property.propertyType === filters.property;
      
      
      const min = parseInt(filters.minPrice);
      const matchMinPrice = isNaN(min) || property.rawPrice >= min;

      
      const max = parseInt(filters.maxPrice);
      const matchMaxPrice = isNaN(max) || property.rawPrice <= max;

      
      const beds = parseInt(filters.bedroom);
      const matchBed = isNaN(beds) || (property.beds && property.beds >= beds);

      return matchLoc && matchPurpose && matchProp && matchMinPrice && matchMaxPrice && matchBed;
    });

    setFilteredResults(results);
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

          <div className="properties-scroll-list">
            {filteredResults.length > 0 ? (
              filteredResults.map((property) => (
                <HorizontalCard key={property.id} property={property} />
              ))
            ) : (
              <div className="empty-results" style={{textAlign: 'center', padding: '40px', color: '#666b7a'}}>
                <h3>No properties found</h3>
                <p>Try adjusting your filters.</p>
              </div>
            )}
          </div>
          
        </div>

        <div className="properties-map-container">
          <Map properties={filteredResults} />
        </div>

      </div>
    </div>
  );
};

export default PropertiesPage;
