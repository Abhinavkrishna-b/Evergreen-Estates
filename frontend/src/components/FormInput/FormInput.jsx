import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './FormInput.css';

const FormInput = ({ Icon, type, placeholder, isPassword, name, value, onChange, required, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="form-input-container">
      <div className={`form-input-wrapper ${isFocused ? 'focused' : ''} ${error ? 'has-error' : ''}`}>
        <Icon className="input-icon-left" size={18} />
        
        <div className="input-field-container">
          {(!value && !isFocused) && (
            <div className="custom-placeholder">
              {placeholder} {required && <span className="required-star">*</span>}
            </div>
          )}
          
          <input
            type={inputType}
            name={name}
            className="custom-input"
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
          />
        </div>

        {isPassword && (
          <button 
            type="button" 
            className="password-toggle" 
            onClick={togglePassword}
            tabIndex="-1"
          >
            {showPassword ? <FiEye size={16} /> : <FiEyeOff size={16} />}
          </button>
        )}
      </div>
      
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default FormInput;