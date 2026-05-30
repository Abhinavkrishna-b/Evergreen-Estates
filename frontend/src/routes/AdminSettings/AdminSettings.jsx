import './AdminSettings.css';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';

const AdminSettings = () => {
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

            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
              />
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