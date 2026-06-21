import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import PropertyHeader from '../../components/PropertyHeader/PropertyHeader';
import PropertyDescription from '../../components/PropertyDescription/PropertyDescription';
import PropertySpecs from '../../components/PropertySpecs/PropertySpecs';
import Map from '../../components/Map/Map';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { getPropertyById } from '../../services/propertyService';
import './PropertyDetails.css';

const PropertyDetails = ({ isAdmin = false }) => {
  const { id } = useParams();
  
  // Backend States
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetching Logic
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const result = await getPropertyById(id);
        setProperty(result);
      } catch (err) {
        setError('Property not found or failed to load.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Loading UI
  if (loading) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <p>Loading property details...</p>
      </div>
    );
  }

  // Error UI
  if (error || !property) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error || 'Property not found'}</p>
      </div>
    );
  }

  let allImages = [property.coverImage, ...(property.images || [])].filter(Boolean);
  
  // Fallback img
  if (allImages.length === 0) {
    allImages = ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop"];
  }

  // ORIGINAL UI LAYOUT
  const mainContent = (
    <div className="property-details-page">
      {!isAdmin && <Navbar />}
      
      <div className="container details-container">
        
        {/* LEFT COLUMN - MAIN CONTENT */}
        <div className="details-left">
            <ImageGallery images={allImages} />
            <PropertyHeader property={property} />
            <PropertyDescription text={property.description} />
        </div>

        {/* RIGHT COLUMN - SIDEBAR */}
        <div className="details-right">
          <PropertySpecs property={property} />

          <div className="sidebar-map-wrapper">
            <Map properties={[property]} />
          </div>

          {!isAdmin && <ActionButtons property={property} />}
        </div>

      </div>

      {!isAdmin && <Footer />}
    </div>
  );

  // If Admin, wrap the original layout in the new AdminSidebar
  if (isAdmin) {
    return (
      <div className="admin-property-detail-layout" style={{ display: 'flex' }}>
        <AdminSidebar />
        <div className="admin-property-detail-content" style={{ flex: 1, width: '100%' }}>
          {mainContent}
        </div>
      </div>
    );
  }

  return mainContent;
};

export default PropertyDetails;