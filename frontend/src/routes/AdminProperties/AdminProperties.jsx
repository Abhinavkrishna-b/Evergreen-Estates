import './AdminProperties.css';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import PropertyManagementTable from '../../components/PropertyManagementTable/PropertyManagementTable';
import { useNavigate } from 'react-router-dom';

const AdminProperties = () => {

  const navigate = useNavigate();

  return (
    <div className="admin-properties-page">

      <AdminSidebar />

      <div className="admin-properties-content">

        <div className="admin-properties-header">

          <div>
            <h1>Properties</h1>
            <p>Manage all property listings.</p>
          </div>

          <button
            className="add-property-btn"
            onClick={() => navigate('/admin/create-post')}>
            + Add Property
          </button>

        </div>

        <PropertyManagementTable />

      </div>

    </div>
  );
};

export default AdminProperties;