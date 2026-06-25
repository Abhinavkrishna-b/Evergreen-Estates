import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { changeAdminPassword } from '../../services/adminService';
import './AdminSettings.css';

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await changeAdminPassword(formData.currentPassword, formData.newPassword);
      setSuccess('Password changed successfully');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

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

          {error && (
            <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>
          )}
          {success && (
            <p style={{ color: 'green', marginBottom: '16px' }}>{success}</p>
          )}

          <form className="settings-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Current Password</label>
              <div className="password-input-wrapper">
                <input
                  type={show.current ? 'text' : 'password'}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  required
                />
                <button type="button" className="password-toggle-btn"
                  onClick={() => setShow(p => ({ ...p, current: !p.current }))}>
                  {show.current ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={show.new ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  required
                />
                <button type="button" className="password-toggle-btn"
                  onClick={() => setShow(p => ({ ...p, new: !p.new }))}>
                  {show.new ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={show.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  required
                />
                <button type="button" className="password-toggle-btn"
                  onClick={() => setShow(p => ({ ...p, confirm: !p.confirm }))}>
                  {show.confirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="update-password-btn"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

