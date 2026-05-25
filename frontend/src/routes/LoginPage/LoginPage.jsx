import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import FormInput from '../../components/FormInput/FormInput';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) errorMsg = 'Email address is required';
      else if (!emailRegex.test(value)) errorMsg = 'Please enter a valid email';
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

    console.log('Login credentials clear! Authenticating user payload:', formData);
    // Backend logic will come here
  };

  return (
    <div className="login-layout">
      <div className="login-card">
        
        <div className="login-header">
          <h1>Welcome back</h1>
          <p>Sign in to manage your <span className="highlight-text">Evergreen Estates</span> dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-fields-container">
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
            
            <div className="password-field-group">
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
              <div className="forgot-password-container">
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </div>
            </div>
          </div>

          <button type="submit" className="login-submit-cta">
            Sign In <FiArrowRight className="cta-arrow" />
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;