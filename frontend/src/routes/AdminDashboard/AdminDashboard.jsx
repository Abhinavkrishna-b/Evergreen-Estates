import './AdminDashboard.css';

import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import DashboardStats from '../../components/DashboardStats/DashboardStats';
import PendingVerifications from '../../components/PendingVerifications/PendingVerifications';
import RecentProperties from '../../components/RecentProperties/RecentProperties';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">

      <AdminSidebar />

      <div className="admin-content">

        <div className="admin-header">
          <h1>Dashboard</h1>
          <p>Manage properties and platform activity.</p>
        </div>

        <DashboardStats />

        <div className="admin-grid">
          <PendingVerifications />
          <RecentProperties />
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;