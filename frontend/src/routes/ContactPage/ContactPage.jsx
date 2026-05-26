import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiMapPin, FiSend } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar'; 
import FormInput from '../../components/FormInput/FormInput';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Buying', // Default selection
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = '';
    
    if (name === 'fullName' && !value.trim()) errorMsg = 'Name is required';
    
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) errorMsg = 'Email is required';
      else if (!emailRegex.test(value)) errorMsg = 'Enter a valid email';
    }

    if (name === 'message' && !value.trim()) errorMsg = 'Please provide details';

    return errorMsg;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const setInquiryType = (type) => {
    setFormData(prev => ({ ...prev, inquiryType: type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const masterErrors = {};
    Object.keys(formData).forEach(field => {
      if (field !== 'phone' && field !== 'inquiryType') {
        const error = validateField(field, formData[field]);
        if (error) masterErrors[field] = error;
      }
    });

    if (Object.keys(masterErrors).length > 0) {
      setErrors(masterErrors);
      return;
    }

    console.log('Consultation Request Submitted:', formData);
    // Submission Logic
  };

  return (
    <>
      <Navbar />
      
      <div className="contact-layout">
        <div className="contact-container">
          
          {/* Left Side: Brand Context & Info */}
          <div className="contact-info-panel">
            <div className="info-header">
              <span className="premium-badge">Expert Consultation</span>
              <h1>Get in Touch</h1>
              <p>Whether you are looking to invest, sell, or simply explore the market, our team of dedicated advisors is here to guide you.</p>
            </div>

            <div className="info-cards-wrapper">
              <div className="contact-method-card">
                <div className="method-icon"><FiMapPin size={20} /></div>
                <div className="method-text">
                  <h3>Corporate Headquarters</h3>
                  <p>124 Evergreen Boulevard,<br/>Salem, Tamil Nadu, 636001</p>
                </div>
              </div>

              <div className="contact-method-card">
                <div className="method-icon"><FiPhone size={20} /></div>
                <div className="method-text">
                  <h3>Direct Advisory</h3>
                  <p>+91 (800) 123-4567<br/>Mon - Sat, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="contact-method-card">
                <div className="method-icon"><FiMail size={20} /></div>
                <div className="method-text">
                  <h3>Digital Support</h3>
                  <p>consult@evergreenestates.com<br/>Typical response within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            <form onSubmit={handleSubmit} className="consultation-form" noValidate>
              
              <div className="inquiry-type-section">
                <label className="section-label">What can we help you with?</label>
                <div className="pill-selector">
                  {['Buying', 'Selling', 'Investing', 'Other'].map(type => (
                    <button
                      key={type}
                      type="button"
                      className={`pill-btn ${formData.inquiryType === type ? 'active' : ''}`}
                      onClick={() => setInquiryType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-grid">
                <FormInput 
                  Icon={FiUser}
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required={true}
                  error={errors.fullName}
                />
                
                <FormInput 
                  Icon={FiMail}
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required={true}
                  error={errors.email}
                />

                <FormInput 
                  Icon={FiPhone}
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required={false}
                />
              </div>

              <div className={`form-input-container textarea-container ${errors.message ? 'has-error' : ''}`}>
                <div className="form-input-wrapper text-area-wrapper">
                  <FiMessageSquare className="input-icon-left text-area-icon" size={18} />
                  <textarea
                    className="custom-textarea"
                    placeholder="Tell us about your property goals..."
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  />
                </div>
                {errors.message && <span className="input-error-text">{errors.message}</span>}
              </div>

              <button type="submit" className="contact-submit-cta">
                Send Request <FiSend className="cta-icon-right" size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactPage;