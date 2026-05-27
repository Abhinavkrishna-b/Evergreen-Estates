import HorizontalCard from '../HorizontalCard/HorizontalCard'; 
import { featuredProperties } from '../../constants/properties';
import './SavedList.css';

const SavedList = () => {
    //first 3 from the mock data
    
    const savedProperties = featuredProperties.slice(0, 3); 

    return (
        <div className="saved-list-container">
        <div className="section-header">
            <h2>My List</h2>
            <button className="create-post-btn">
            Create New Post
            </button>
        </div>
        
        <div className="property-list">
            {savedProperties.map(property => (
            <HorizontalCard key={property.id} property={property} />
            ))}
        </div>
        </div>
    );
    };

export default SavedList;