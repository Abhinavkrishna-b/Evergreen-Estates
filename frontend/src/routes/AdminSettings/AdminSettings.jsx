import './AdminSettings.css';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';

const AdminSettings = () => {
    
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="admin-settings-page">

      <AdminSidebar />

      <div className="admin-settings-content">

        <div className="admin-settings-header">
          <h1>Settings</h1>
          <p>Manage your account security.</p>
        </div>

        <div className="settings-form-card">

          <h2>Change Password</h2>

          <form className="settings-form">

            {/* Current Password */}

            <div className="form-group">

              <label>Current Password</label>

              <div className="password-input-wrapper">

                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="Enter current password"
                />

                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                >
                  {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                </button>

              </div>

            </div>

            {/* New Password */}

            <div className="form-group">

              <label>New Password</label>

              <div className="password-input-wrapper">

                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                />

                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() =>
                    setShowNewPassword(!showNewPassword)
                  }
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </button>

              </div>

            </div>

            {/* Confirm Password */}

            <div className="form-group">

              <label>Confirm Password</label>

              <div className="password-input-wrapper">

                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                />

                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="update-password-btn"
            >
              Update Password
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AdminSettings;