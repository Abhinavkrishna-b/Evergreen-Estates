import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { featuredProperties } from '../../constants/properties';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import PropertyHeader from '../../components/PropertyHeader/PropertyHeader';
import PropertyDescription from '../../components/PropertyDescription/PropertyDescription';
import PropertySpecs from '../../components/PropertySpecs/PropertySpecs';
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
            <PropertyHeader property={property} />
            <PropertyDescription text={property.description} />
        </div>

        {/* RIGHT COLUMN - SIDEBAR */}
        <div className="details-right">
          <PropertySpecs property={property} />
          <div className="placeholder-box">Map Component Will Go Here</div>
          <div className="placeholder-box">Action Buttons Will Go Here</div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;