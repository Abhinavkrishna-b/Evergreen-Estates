import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { featuredProperties } from '../../constants/properties';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import './PropertyDetails.css'; 

const PropertyDetails = () => {
  const { id } = useParams();

  const property = featuredProperties.find((item) => item.id === parseInt(id));

  if (!property) {
    return <Navigate to="/properties" />;
  }

  return (
    <div className="property-details-page">
      <Navbar />
      
      <div className="container details-container">
        
        {/* LEFT COLUMN - MAIN CONTENT */}
        <div className="details-left">
            <ImageGallery images={property.images} />
            <div className="placeholder-box">Header & Agent Component Will Go Here</div>
            <div className="placeholder-box">Description Component Will Go Here</div>
        </div>

        {/* RIGHT COLUMN - SIDEBAR */}
        <div className="details-right">
          <div className="placeholder-box">Property Specs (isLand logic) Will Go Here</div>
          <div className="placeholder-box">Map Component Will Go Here</div>
          <div className="placeholder-box">Action Buttons Will Go Here</div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;