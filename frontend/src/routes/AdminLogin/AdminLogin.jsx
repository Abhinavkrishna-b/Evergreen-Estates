import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import FormInput from '../../components/FormInput/FormInput';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) errorMsg = 'Admin email address is required';
      else if (!emailRegex.test(value)) errorMsg = 'Please enter a valid email address';
    }

    if (name === 'password') {
      if (!value) errorMsg = 'Password is required';
    }

    return errorMsg;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const masterErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) masterErrors[field] = error;
    });

    if (Object.keys(masterErrors).length > 0) {
      setErrors(masterErrors);
      return;
    }

    console.log('Admin credentials clear! Processing security verification:', formData);
  };

  return (
    <div className="admin-login-layout">
      <div className="admin-login-card">
        
        <div className="admin-login-header">
          <h1>Admin Portal</h1>
          <p>Sign in to your elevated directory account for <span className="highlight-text">Evergreen Estates</span></p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form" noValidate>
          <div className="form-fields-container">
            <FormInput 
              Icon={FiMail}
              type="email"
              placeholder="Admin Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required={true}
              error={errors.email}
            />
            
            <div className="password-field-group">
              <FormInput 
                Icon={FiLock}
                isPassword={true}
                placeholder="Master Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required={true}
                error={errors.password}
              />
              <div className="forgot-password-container">
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </div>
            </div>
          </div>

          <button type="submit" className="admin-login-submit-cta">
            Secure Sign In <FiArrowRight className="cta-arrow" />
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;