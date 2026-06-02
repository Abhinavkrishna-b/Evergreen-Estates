import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { featuredProperties } from '../../constants/properties'; 

import './CreatePost.css';

const CreatePost = ({ isAdmin = false }) => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // 1. Find the data synchronously during the initial render (No useEffect needed!)
  const initialData = isEditMode 
    ? featuredProperties.find(p => p.id === parseInt(id)) 
    : null;

  // 2. Initialize the state directly with the found data (or default to 'Villa')
  const [propertyType, setPropertyType] = useState(() => {
    if (initialData) {
      return initialData.type === 'Agriculture' ? 'Agriculture Land' : initialData.type;
    }
    return 'Villa';
  });

  const isLand = propertyType === 'Land' || propertyType === 'Agriculture Land';
  const areaUnit = isLand ? 'Acres' : 'Sq Ft';

  const formContent = (
    <div className="create-post-container">
      {/* LEFT: FORM DATA */}
      <div className="create-post-form">
        <div className="form-card">
          <h1>{isEditMode ? 'Edit Property' : (isAdmin ? 'Admin: Create Property' : 'Create Property')}</h1>
          <p>{isEditMode ? 'Update the property information below.' : 'Fill in the property information below to list the property.'}</p>

          <form onSubmit={(e) => e.preventDefault()}>
            
            {/* 1. LISTING INFORMATION */}
            <div className="form-section">
              <h3>1. Listing Information</h3>
              <div className="form-grid">
                
                <div className="input-group">
                  <label>Property Title <span className="required">*</span></label>
                  <input type="text" name="title" defaultValue={initialData?.title || ''} placeholder="Luxury Villa in Mumbai" required />
                </div>

                <div className="input-group">
                  <label>Purpose <span className="required">*</span></label>
                  <select name="purpose" defaultValue={initialData?.purpose || 'Buy'} required>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Property Type <span className="required">*</span></label>
                  <select 
                    name="propertyType"
                    required 
                    value={propertyType} 
                    onChange={(e) => setPropertyType(e.target.value)}
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
                  <input type="number" name="price" defaultValue={initialData?.rawPrice || ''} placeholder="25000000" required />
                </div>

              </div>

              <div className="input-group full-width">
                <label>Description <span className="required">*</span></label>
                <textarea name="description" defaultValue={initialData?.description || ''} rows="5" placeholder="Provide a detailed description of the property..." required />
              </div>
            </div>

            {/* 3. LOCATION */}
            <div className="form-section">
              <h3>3. Location</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>State <span className="required">*</span></label>
                  <input type="text" name="state" placeholder="Tamil Nadu" required />
                </div>
                <div className="input-group">
                  <label>City <span className="required">*</span></label>
                  <input type="text" name="city" placeholder="Salem" required />
                </div>
                <div className="input-group">
                  <label>Locality <span className="required">*</span></label>
                  <input type="text" name="locality" defaultValue={initialData?.location || ''} placeholder="Hasthampatti" required />
                </div>
                <div className="input-group">
                  <label>Full Address <span className="required">*</span></label>
                  <input type="text" name="fullAddress" placeholder="12, ABC Street" required />
                </div>
              </div>
            </div>

            {/* 4. MAP LOCATION */}
            <div className="form-section">
              <h3>4. Map Location</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>Latitude <span className="required">*</span></label>
                  <input type="number" name="latitude" defaultValue={initialData?.latitude || ''} step="any" placeholder="Pick on map or enter" required />
                </div>
                <div className="input-group">
                  <label>Longitude <span className="required">*</span></label>
                  <input type="number" name="longitude" defaultValue={initialData?.longitude || ''} step="any" placeholder="Pick on map or enter" required />
                </div>
              </div>
            </div>

            {/* 5. PROPERTY SPECIFICATIONS */}
            <div className="form-section">
              <h3>5. Property Specifications</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>Facing Direction <span className="required">*</span></label>
                  <select name="facingDirection" defaultValue={initialData?.facing || ''} required>
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
                  <input type="text" name="area" defaultValue={initialData?.sqft || initialData?.landArea || ''} placeholder={`Enter area in ${areaUnit}`} required />
                </div>
              </div>
            </div>

            {/* 6. HOUSE / VILLA / APARTMENT SECTION */}
            {!isLand && (
              <div className="form-section">
                <h3>6. Property Details</h3>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Configuration</label>
                    <select name="configuration" defaultValue={initialData?.configuration || ''}>
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
                    <input type="number" name="beds" defaultValue={initialData?.beds || ''} placeholder="Number of bedrooms" required />
                  </div>
                  <div className="input-group">
                    <label>Bathrooms <span className="required">*</span></label>
                    <input type="number" name="baths" defaultValue={initialData?.baths || ''} placeholder="Number of bathrooms" required />
                  </div>
                  <div className="input-group">
                    <label>Furnishing</label>
                    <select name="furnishing" defaultValue={initialData?.furnishing || 'Unfurnished'}>
                      <option value="Unfurnished">Unfurnished</option>
                      <option value="Semi Furnished">Semi Furnished</option>
                      <option value="Fully Furnished">Fully Furnished</option>
                    </select>
                  </div>
                  <div className="input-group full-width">
                    <label>Parking Details</label>
                    <select name="parking" defaultValue={initialData?.parking || ''}>
                      <option value="">Select parking type</option>
                      <option value="1 Covered Parking">1 Covered Parking</option>
                      <option value="2 Covered Parking">2 Covered Parking</option>
                      <option value="Open Parking">Open Parking</option>
                    </select>
                  </div>
                </div>
                <div className="input-group full-width" style={{marginTop: '20px'}}>
                  <label>Community Rules</label>
                  <textarea name="policies" defaultValue={initialData?.policies || ''} rows="3" placeholder="e.g., Pet Friendly, No Loud Music, Gated Community" />
                </div>
              </div>
            )}

            {/* 7. LAND SECTION */}
            {isLand && (
              <div className="form-section">
                <h3>7. Land Details</h3>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Configuration</label>
                    <select name="configuration" defaultValue={initialData?.configuration || ''}>
                      <option value="">Select configuration</option>
                      <option value="Residential Plot">Residential Plot</option>
                      <option value="Commercial Plot">Commercial Plot</option>
                      <option value="Farm Land">Farm Land</option>
                      <option value="Industrial Land">Industrial Land</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Approval Authority</label>
                    <select name="approvalStatus" defaultValue={initialData?.approvalStatus || ''}>
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
                    <select name="soilType" defaultValue={initialData?.soilType || ''}>
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
                    <select name="waterSource" defaultValue={initialData?.waterSource || ''}>
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
                    <select name="electricity" defaultValue={initialData?.electricity || ''}>
                      <option value="">Select connection status</option>
                      <option value="No Connection">No Connection</option>
                      <option value="Single Phase">Single Phase</option>
                      <option value="Three Phase">Three Phase</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="submit-post-btn">
              {isEditMode ? 'Save Changes' : (isAdmin ? 'Publish Property Directly' : 'Submit For Verification')}
            </button>

          </form>
        </div>
      </div>

      {/* RIGHT: SIDEBAR (IMAGES & VERIFICATION) */}
      <div className="create-post-sidebar">
        
        {/* 2. PROPERTY IMAGES */}
        <div className="upload-card">
          <h3>2. Property Images</h3>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Cover Image {!isEditMode && <span className="required">*</span>}</label>
            <input type="file" name="image" accept="image/*" required={!isEditMode} />
          </div>
          <div className="input-group">
            <label>Gallery Image 1 {!isEditMode && <span className="required">*</span>}</label>
            <input type="file" name="images[]" accept="image/*" required={!isEditMode} />
            <label style={{ marginTop: '8px' }}>Gallery Image 2 {!isEditMode && <span className="required">*</span>}</label>
            <input type="file" name="images[]" accept="image/*" required={!isEditMode} />
            <label style={{ marginTop: '8px' }}>Gallery Image 3 {!isEditMode && <span className="required">*</span>}</label>
            <input type="file" name="images[]" accept="image/*" required={!isEditMode} />
          </div>
        </div>

        {/* 8. VERIFICATION DOCUMENTS */}
        <div className="upload-card">
          <h3>8. Verification Documents</h3>
          <p className="upload-helper">Required for property authenticity.</p>
          <div className="input-group">
            <label>Ownership Proof {!isEditMode && <span className="required">*</span>}</label>
            <p className="upload-subtext">Sale Deed, Patta, Khata, EC, etc.</p>
            <input type="file" name="ownership_proof" accept=".pdf,image/*" required={!isEditMode} />
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