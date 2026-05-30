import './AdminSidebar.css';

import {
  FiGrid,
  FiHome,
  FiCheckCircle,
  FiUsers,
  FiSettings
} from 'react-icons/fi';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">

      <div className="sidebar-logo">
        Estate Admin
      </div>

      <nav className="sidebar-nav">

        <button className="sidebar-item active">
          <FiGrid />
          <span>Dashboard</span>
        </button>

        <button className="sidebar-item">
          <FiHome />
          <span>Properties</span>
        </button>

        <button className="sidebar-item">
          <FiCheckCircle />
          <span>Verification</span>
        </button>

        <button className="sidebar-item">
          <FiUsers />
          <span>Users</span>
        </button>

        <button className="sidebar-item">
          <FiSettings />
          <span>Settings</span>
        </button>

      </nav>

    </aside>
  );
};

export default AdminSidebar;