import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FilterBar from '../../components/FilterBar/FilterBar';
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard';
import Map from '../../components/Map/Map';
import './PropertiesPage.css';
import { getProperties } from '../../services/propertyService';

const PropertiesPage = () => {
  // Read URL parameters
  const [searchParams] = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
      city: searchParams.get('city') || '',
      purpose: searchParams.get('purpose') || '',
      propertyType: searchParams.get('propertyType') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      beds: searchParams.get('beds') || '',
    });

  useEffect(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getProperties(filters);
      setProperties(result);
    } catch (err) {
      setError('Failed to load properties. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="properties-layout">

      <Navbar />

      <div className="properties-content">
        
        <div className="properties-list-container">
          <div className="list-header">
            <h2>Search results for <span>{filters.city || "All Locations"}</span></h2>
          </div>

          <FilterBar 
            filters={filters} 
            handleFilterChange={handleFilterChange} 
            onSearch={handleSearch} 
          />

          <div className="properties-scroll-list">

            {loading && <p style={{ padding: '20px' }}>Loading properties...</p>}
            {error && <p style={{ padding: '20px', color: 'red' }}>{error}</p>}

            {!loading && !error && properties.length > 0 ? (
              properties.map((property) => (
                <HorizontalCard key={property._id || property.id} property={property} />
              ))
            ) : (
              !loading && !error && (
                <div className="empty-results" style={{textAlign: 'center', padding: '40px', color: '#666b7a'}}>
                  <h3>No properties found</h3>
                  <p>Try adjusting your filters.</p>
                </div>
              )
            )}
          </div>
          
        </div>

        <div className="properties-map-container">
          <Map properties={properties} />
        </div>

      </div>

      <Footer/>

    </div>
  );
};

export default PropertiesPage;