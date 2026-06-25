import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FiLogOut } from 'react-icons/fi';
import './AdminDashboard.css';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import DashboardStats from '../../components/DashboardStats/DashboardStats';
import PendingVerifications from '../../components/PendingVerifications/PendingVerifications';
import RecentProperties from '../../components/RecentProperties/RecentProperties';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adminLogout, isAdminLoggedIn } = useAdminAuth();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin-login');
    }
  }, [isAdminLoggedIn, navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin-login');
  };

  return (
    <div className="admin-dashboard">

      <AdminSidebar />

      <div className="admin-content">

        {/* Updated Header with Flexbox to push button to the right */}
        <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Dashboard</h1>
            <p>Manage properties and platform activity.</p>
          </div>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              backgroundColor: '#ffebeb',
              color: '#d93025',
              border: '1px solid #fad2d0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#fce8e6';
              e.currentTarget.style.borderColor = '#f2b8b5';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ffebeb';
              e.currentTarget.style.borderColor = '#fad2d0';
            }}
          >
            <FiLogOut size={18} />
            Logout
          </button>
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
