import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiHome, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import FormInput from '../../components/FormInput/FormInput';
import RoleCard from '../../components/RoleCard/RoleCard';
import { useAuth } from '../../context/AuthContext';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    role: 'buyer',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const validateField = (name, value) => {
    let errorMsg = '';
    if (name === 'fullName') {
      if (!value.trim()) errorMsg = 'Full name is required';
      else if (value.trim().length < 3) errorMsg = 'Name must be at least 3 characters';
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) errorMsg = 'Email address is required';
      else if (!emailRegex.test(value)) errorMsg = 'Please enter a valid email address';
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
    setApiError('');
    if (name === 'password' && formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: value === formData.confirmPassword ? '' : 'Passwords do not match'
      }));
    }
  };

  const setRole = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const masterErrors = {};
    Object.keys(formData).forEach(field => {
      if (field !== 'role') {
        const error = validateField(field, formData[field]);
        if (error) masterErrors[field] = error;
      }
    });

    if (Object.keys(masterErrors).length > 0) {
      setErrors(masterErrors);
      return;
    }

    const result = await register(
      formData.fullName,
      formData.email,
      formData.password,
      formData.role
    );

    if (result.success) {
      if (formData.role === 'seller') {
        navigate('/seller-profile');
      } else {
        navigate('/profile');
      }
    } else {
      setApiError(result.message);
    }
  };

  return (
    <div className="signup-layout">
      <div className="signup-card">

        <div className="signup-header">
          <h1>Create account</h1>
          <p>Get started with <span className="highlight-text">Evergreen Estates</span></p>
        </div>

        {apiError && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '12px' }}>
            {apiError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="signup-form" noValidate>
          <div className="role-section">
            <p className="role-label">I am a</p>
            <div className="role-cards-container">
              <RoleCard
                Icon={FiHome}
                title="Buyer"
                isSelected={formData.role === 'buyer'}
                onClick={() => setRole('buyer')}
              />
              <RoleCard
                Icon={FiBriefcase}
                title="Seller"
                isSelected={formData.role === 'seller'}
                onClick={() => setRole('seller')}
              />
            </div>
          </div>

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
              placeholder="Email Address"
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

          <button type="submit" className="submit-cta-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
            {!loading && <FiArrowRight className="cta-arrow" />}
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;