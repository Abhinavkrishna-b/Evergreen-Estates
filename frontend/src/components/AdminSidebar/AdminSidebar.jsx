import './AdminSidebar.css';
import { NavLink } from 'react-router-dom';

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

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? 'sidebar-item active' : 'sidebar-item'
          }
        >
          <FiGrid />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/properties"
          className={({ isActive }) =>
            isActive ? 'sidebar-item active' : 'sidebar-item'
          }
        >
          <FiHome />
          <span>Properties</span>
        </NavLink>

        <NavLink
          to="/admin/verifications"
          className={({ isActive }) =>
            isActive ? 'sidebar-item active' : 'sidebar-item'
          }
        >
          <FiCheckCircle />
          <span>Verification</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? 'sidebar-item active' : 'sidebar-item'
          }
        >
          <FiUsers />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive ? 'sidebar-item active' : 'sidebar-item'
          }
        >
          <FiSettings />
          <span>Settings</span>
        </NavLink>

      </nav>

    </aside>
  );
};

export default AdminSidebar;