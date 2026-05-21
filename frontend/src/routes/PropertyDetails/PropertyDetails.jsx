import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { featuredProperties } from '../../constants/properties';

const PropertyDetails = () => {
  const { id } = useParams();

  const property = featuredProperties.find((item) => item.id === parseInt(id));

  if (!property) {
    return <Navigate to="/properties" />;
  }

  return (
    <div className="property-details-page">
      <Navbar />
      
      <div className="container" style={{ padding: '40px 20px' }}>
        <h1>{property.title}</h1>
        <p>Testing route: The page is initialized and ready to be built.</p>
      </div>
    </div>
  );
};

export default PropertyDetails;
