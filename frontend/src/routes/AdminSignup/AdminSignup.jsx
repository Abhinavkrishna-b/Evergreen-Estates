import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import FormInput from '../../components/FormInput/FormInput';
import './AdminSignup.css';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'fullName') {
      if (!value.trim()) errorMsg = 'Full name is required';
      else if (value.trim().length < 3) errorMsg = 'Name must be at least 3 characters';
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) errorMsg = 'Email address is required';
      else if (!emailRegex.test(value)) errorMsg = 'Enter a valid admin email';
    }

    if (name === 'password') {
      if (!value) errorMsg = 'Password is required';
      else if (value.length < 8) errorMsg = 'Must be at least 8 characters';
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        errorMsg = 'Requires uppercase, lowercase, and a number';
      }
    }

    if (name === 'confirmPassword') {
      if (!value) errorMsg = 'Please confirm your password';
      else if (value !== formData.password) errorMsg = 'Passwords do not match';
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

    console.log('Admin Authentication Clear. Payload:', { ...formData, role: 'admin' });
  };

  return (
    <div className="admin-layout">
      <div className="admin-card">
        
        <div className="admin-header">
          <h1>Admin Portal</h1>
          <p>Create an elevated directory account for <span className="highlight-text">Evergreen Estates</span></p>
        </div>

        <form onSubmit={handleSubmit} className="admin-form" noValidate>
          <div className="form-fields-container">
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
              placeholder="Admin Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required={true}
              error={errors.email}
            />
            
            <FormInput 
              Icon={FiLock}
              isPassword={true}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required={true}
              error={errors.password}
            />
            
            <FormInput 
              Icon={FiLock}
              isPassword={true}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required={true}
              error={errors.confirmPassword}
            />
          </div>

          <button type="submit" className="admin-submit-cta">
            Create Admin Account <FiArrowRight className="cta-arrow" />
          </button>
        </form>

        <div className="admin-footer">
          <p>Already have an account? <Link to="/login" className="login-link">Sign in</Link></p>
        </div>
        
      </div>
    </div>
  );
};

export default AdminSignup;