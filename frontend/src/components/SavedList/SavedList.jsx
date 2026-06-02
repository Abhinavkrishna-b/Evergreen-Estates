import { FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import HorizontalCard from '../HorizontalCard/HorizontalCard'; 
import { featuredProperties } from '../../constants/properties';
import './SavedList.css';

const SavedList = () => {
    //first 3 from the mock data
    const savedProperties = featuredProperties.slice(0, 3); 

    const handleMessage = (e, propertyId) => {
      e.stopPropagation();
      console.log(`Open message for property: ${propertyId}`);
      // Logic to open chat box
    };

    const handleRemove = (e, propertyId) => {
      e.stopPropagation();

      const isConfirmed = window.confirm("Are you sure you want to remove this property from your saved list?");
      if (isConfirmed) {
      console.log(`Removed property ${propertyId} from saved list`);
      // Logic to remove from database/state
      }
    };

    return (
        <div className="saved-list-container">
          <div className="section-header">
              <h2>My List</h2>
          </div>
          
          <div className="property-list">
              {savedProperties.map(property => (
                <HorizontalCard 
                  key={property.id} 
                  property={property} 
                  customActions={
                    <>
                      <button 
                        className="icon-btn" 
                        onClick={(e) => handleMessage(e, property.id)}
                        title="Message Seller"
                      >
                        <FiMessageSquare />
                      </button>
                      <button 
                        className="icon-btn delete-action" 
                        onClick={(e) => handleRemove(e, property.id)}
                        title="Remove from Saved"
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

export default SavedList;