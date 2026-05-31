import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import HorizontalCard from '../HorizontalCard/HorizontalCard'; 
import { featuredProperties } from '../../constants/properties';
import './MyListings.css';

const MyListings = () => {
  // Mocking the seller's own listings
  const navigate = useNavigate();

  const myProperties = featuredProperties.slice(3, 5); 

  return (
    <div className="my-listings-container">
      <div className="section-header">
        <h2>My Properties</h2>
        
        <button
          className="create-post-btn"
          onClick={() => navigate('/create-post')}>
          <FiPlus size={18} />
          Create Post
        </button>
      </div>
      
      <div className="property-list">
        {myProperties.map(property => (
          <HorizontalCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default MyListings;