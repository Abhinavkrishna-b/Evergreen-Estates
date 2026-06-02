import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import HorizontalCard from '../HorizontalCard/HorizontalCard'; 
import { featuredProperties } from '../../constants/properties';
import './MyListings.css';

const MyListings = () => {
  // Mocking the seller's own listings
  const navigate = useNavigate();

  const myProperties = featuredProperties.slice(3, 5); 

  const handleEdit = (e, propertyId) => {
    e.stopPropagation();
    navigate(`/edit-post/${propertyId}`);
  };

  const handleDelete = (e, propertyId) => {
    e.stopPropagation();
    const isConfirmed = window.confirm("Are you sure you want to delete this property?");
    if (isConfirmed) {
      console.log(`Deleted property: ${propertyId}`);
      // Add your API delete call here later
    }
  };

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
          <HorizontalCard 
            key={property.id} 
            property={property} 
            customActions={
              <>
                <button 
                  className="icon-btn edit-action" 
                  onClick={(e) => handleEdit(e, property.id)}
                  title="Edit Property"
                >
                  <FiEdit />
                </button>
                <button 
                  className="icon-btn delete-action" 
                  onClick={(e) => handleDelete(e, property.id)}
                  title="Delete Property"
                >
                  <FiTrash2 />
                </button>
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MyListings;