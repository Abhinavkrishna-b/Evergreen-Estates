import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useAuth } from '../../context/AuthContext'; 
import { createProperty, updateProperty, getPropertyById } from '../../services/propertyService';
import './CreatePost.css';

const CreatePost = ({ isAdmin = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSeller } = useAuth();
  const isEditMode = Boolean(id);
  const hasAccess = isAdmin ? true : isSeller;

  const [propertyType, setPropertyType] = useState('Villa');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    purpose: 'Buy',
    price: '',
    description: '',
    state: '',
    city: '',
    locality: '',
    fullAddress: '',
    latitude: '',
    longitude: '',
    facingDirection: '',
    area: '',
    // Building fields
    configuration: '',
    beds: '',
    baths: '',
    furnishing: 'Unfurnished',
    parking: '',
    policies: '',
    // Land fields
    approvalAuthority: '',
    soilType: '',
    waterSource: '',
    electricity: '',
  });

  const isLand = propertyType === 'Land' || propertyType === 'Agriculture Land';
  const areaUnit = isLand ? 'Acres' : 'Sq Ft';

  // If edit mode — fetch existing property and pre-fill form
  useEffect(() => {
    if (!isEditMode) return;

    const fetchProperty = async () => {
      try {
        const property = await getPropertyById(id);
        setPropertyType(property.propertyType || 'Villa');
        setFormData({
          title: property.title || '',
          purpose: property.purpose || 'Buy',
          price: property.price || '',
          description: property.description || '',
          state: property.state || '',
          city: property.city || '',
          locality: property.locality || '',
          fullAddress: property.fullAddress || '',
          latitude: property.latitude || '',
          longitude: property.longitude || '',
          facingDirection: property.facingDirection || '',
          area: property.area || '',
          configuration: property.configuration || '',
          beds: property.beds || '',
          baths: property.baths || '',
          furnishing: property.furnishing || 'Unfurnished',
          parking: property.parking || '',
          policies: property.policies || '',
          approvalAuthority: property.approvalAuthority || '',
          soilType: property.soilType || '',
          waterSource: property.waterSource || '',
          electricity: property.electricity || '',
        });
      } catch (err) {
        setError('Failed to load property data.');
        console.error(err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProperty();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        propertyType,
        price: Number(formData.price),
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        beds: formData.beds ? Number(formData.beds) : null,
        baths: formData.baths ? Number(formData.baths) : null,
      };

      if (isLand) {
        payload.beds = null;
        payload.baths = null;
        payload.furnishing = null;
        payload.parking = null;
        payload.policies = null;
      } else {
        payload.approvalAuthority = null;
        payload.soilType = null;
        payload.waterSource = null;
        payload.electricity = null;
      }

      if (isEditMode) {
        await updateProperty(id, payload);
        setSuccess('Property updated successfully! Resubmitted for verification.');
        setTimeout(() => navigate('/seller-profile'), 2000);
      } else {
        await createProperty(payload);
        setSuccess('Property submitted for verification!');
        setTimeout(() => navigate('/seller-profile'), 2000);
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit property. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <p>Loading property data...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <>
        {!isAdmin && <Navbar />}
        <div className="create-post-container">
          <div style={{ 
            padding: '60px 20px', 
            textAlign: 'center',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ maxWidth: '500px' }}>
              <h2 style={{ color: '#e74c3c', marginBottom: '16px' }}>403 - Access Denied</h2>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
                Only sellers can create property listings.
              </p>
              <button 
                onClick={() => navigate('/')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#1a1a2e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
        {!isAdmin && <Footer />}
      </>
    );
  }

  const formContent = (
    <div className="create-post-container">

      <div className="create-post-form">
        <div className="form-card">
          <h1>
            {isEditMode ? 'Edit Property' : (isAdmin ? 'Admin: Create Property' : 'Create Property')}
          </h1>
          <p>
            {isEditMode
              ? 'Update the property information below.'
              : 'Fill in the property information below to list the property.'}
          </p>

          {error && (
            <p style={{ color: 'red', marginBottom: '16px', padding: '10px', background: '#fff5f5', borderRadius: '8px' }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: 'green', marginBottom: '16px', padding: '10px', background: '#f0fff4', borderRadius: '8px' }}>
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit}>

            {/* 1. LISTING INFORMATION */}
            <div className="form-section">
              <h3>1. Listing Information</h3>
              <div className="form-grid">

                <div className="input-group">
                  <label>Property Title <span className="required">*</span></label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Luxury Villa in Mumbai"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Purpose <span className="required">*</span></label>
                  <select name="purpose" value={formData.purpose} onChange={handleChange} required>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Property Type <span className="required">*</span></label>
                  <select
                    name="propertyType"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    required
                  >
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Land">Land</option>
                    <option value="Agriculture Land">Agriculture Land</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Price (₹) <span className="required">*</span></label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="25000000"
                    required
                  />
                </div>

              </div>

              <div className="input-group full-width">
                <label>Description <span className="required">*</span></label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Provide a detailed description..."
                  required
                />
              </div>
            </div>

            {/* 3. LOCATION */}
            <div className="form-section">
              <h3>3. Location</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>State <span className="required">*</span></label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Tamil Nadu" required />
                </div>
                <div className="input-group">
                  <label>City <span className="required">*</span></label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Salem" required />
                </div>
                <div className="input-group">
                  <label>Locality <span className="required">*</span></label>
                  <input type="text" name="locality" value={formData.locality} onChange={handleChange} placeholder="Hasthampatti" required />
                </div>
                <div className="input-group">
                  <label>Full Address <span className="required">*</span></label>
                  <input type="text" name="fullAddress" value={formData.fullAddress} onChange={handleChange} placeholder="12, ABC Street" required />
                </div>
              </div>
            </div>

            {/* 4. MAP LOCATION */}
            <div className="form-section">
              <h3>4. Map Location</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>Latitude <span className="required">*</span></label>
                  <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} step="any" placeholder="13.0067" required />
                </div>
                <div className="input-group">
                  <label>Longitude <span className="required">*</span></label>
                  <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} step="any" placeholder="80.2206" required />
                </div>
              </div>
            </div>

            {/* 5. SPECIFICATIONS */}
            <div className="form-section">
              <h3>5. Property Specifications</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>Facing Direction <span className="required">*</span></label>
                  <select name="facingDirection" value={formData.facingDirection} onChange={handleChange} required>
                    <option value="">Select direction</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North-East">North-East</option>
                    <option value="North-West">North-West</option>
                    <option value="South-East">South-East</option>
                    <option value="South-West">South-West</option>
                    <option value="East Facing Main Road">East Facing Main Road</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Area ({areaUnit}) <span className="required">*</span></label>
                  <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder={`Enter area in ${areaUnit}`} required />
                </div>
              </div>
            </div>

            {/* 6. BUILDING DETAILS */}
            {!isLand && (
              <div className="form-section">
                <h3>6. Property Details</h3>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Configuration</label>
                    <select name="configuration" value={formData.configuration} onChange={handleChange}>
                      <option value="">Select configuration</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                      <option value="5+ BHK">5+ BHK</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Bedrooms <span className="required">*</span></label>
                    <input type="number" name="beds" value={formData.beds} onChange={handleChange} placeholder="Number of bedrooms" required />
                  </div>
                  <div className="input-group">
                    <label>Bathrooms <span className="required">*</span></label>
                    <input type="number" name="baths" value={formData.baths} onChange={handleChange} placeholder="Number of bathrooms" required />
                  </div>
                  <div className="input-group">
                    <label>Furnishing</label>
                    <select name="furnishing" value={formData.furnishing} onChange={handleChange}>
                      <option value="Unfurnished">Unfurnished</option>
                      <option value="Semi Furnished">Semi Furnished</option>
                      <option value="Fully Furnished">Fully Furnished</option>
                    </select>
                  </div>
                  <div className="input-group full-width">
                    <label>Parking Details</label>
                    <select name="parking" value={formData.parking} onChange={handleChange}>
                      <option value="">Select parking type</option>
                      <option value="1 Covered Parking">1 Covered Parking</option>
                      <option value="2 Covered Parking">2 Covered Parking</option>
                      <option value="Open Parking">Open Parking</option>
                    </select>
                  </div>
                </div>
                <div className="input-group full-width" style={{ marginTop: '20px' }}>
                  <label>Community Rules</label>
                  <textarea name="policies" value={formData.policies} onChange={handleChange} rows="3" placeholder="e.g., Pet Friendly, No Loud Music" />
                </div>
              </div>
            )}

            {/* 7. LAND DETAILS */}
            {isLand && (
              <div className="form-section">
                <h3>7. Land Details</h3>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Configuration</label>
                    <select name="configuration" value={formData.configuration} onChange={handleChange}>
                      <option value="">Select configuration</option>
                      <option value="Residential Plot">Residential Plot</option>
                      <option value="Commercial Plot">Commercial Plot</option>
                      <option value="Farm Land">Farm Land</option>
                      <option value="Industrial Land">Industrial Land</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Approval Authority</label>
                    <select name="approvalAuthority" value={formData.approvalAuthority} onChange={handleChange}>
                      <option value="">Select authority</option>
                      <option value="Patta">Patta</option>
                      <option value="DTCP">DTCP</option>
                      <option value="CMDA">CMDA</option>
                      <option value="RERA">RERA</option>
                      <option value="Panchayat Approval">Panchayat Approval</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Soil Type</label>
                    <select name="soilType" value={formData.soilType} onChange={handleChange}>
                      <option value="">Select soil type</option>
                      <option value="Red Soil">Red Soil</option>
                      <option value="Black Soil">Black Soil</option>
                      <option value="Clay Soil">Clay Soil</option>
                      <option value="Mixed Soil">Mixed Soil</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Water Source</label>
                    <select name="waterSource" value={formData.waterSource} onChange={handleChange}>
                      <option value="">Select water source</option>
                      <option value="Borewell">Borewell</option>
                      <option value="Open Well">Open Well</option>
                      <option value="River Water">River Water</option>
                      <option value="Canal Water">Canal Water</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Electricity</label>
                    <select name="electricity" value={formData.electricity} onChange={handleChange}>
                      <option value="">Select connection status</option>
                      <option value="No Connection">No Connection</option>
                      <option value="Single Phase">Single Phase</option>
                      <option value="Three Phase">Three Phase</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="submit-post-btn"
              disabled={loading}
            >
              {loading
                ? 'Submitting...'
                : isEditMode
                ? 'Save Changes'
                : isAdmin
                ? 'Publish Property Directly'
                : 'Submit For Verification'}
            </button>

          </form>
        </div>
      </div>

      <div className="create-post-sidebar">

        <div className="upload-card">
          <h3>2. Property Images</h3>
          <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>
            Image upload will be available after Cloudinary integration.
            For now, images can be added via URL.
          </p>
          <div className="input-group">
            <label>Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              value={formData.coverImage || ''}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="upload-card">
          <h3>8. Verification Documents</h3>
          <p className="upload-helper">Required for property authenticity.</p>
          <div className="input-group">
            <label>Ownership Proof</label>
            <p className="upload-subtext">Sale Deed, Patta, Khata, EC, etc.</p>
            <input type="file" name="ownership_proof" accept=".pdf,image/*" />
          </div>
          <div className="input-group" style={{ marginTop: '16px' }}>
            <label>Approval Document</label>
            <p className="upload-subtext">DTCP, CMDA, RERA, etc.</p>
            <input type="file" name="approval_document" accept=".pdf,image/*" />
          </div>
        </div>

      </div>
    </div>
  );

  if (isAdmin) {
    return (
      <div className="admin-post-layout">
        <AdminSidebar />
        <div className="admin-post-content">
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="create-post-page">
        {formContent}
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;