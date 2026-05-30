import './AdminProperties.css';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import PropertyManagementTable from '../../components/PropertyManagementTable/PropertyManagementTable';

const AdminProperties = () => {
  return (
    <div className="admin-properties-page">

      <AdminSidebar />

      <div className="admin-properties-content">

        <div className="admin-properties-header">

          <div>
            <h1>Properties</h1>
            <p>Manage all property listings.</p>
          </div>

          <button className="add-property-btn">
            + Add Property
          </button>

        </div>

        <PropertyManagementTable />

      </div>

    </div>
  );
};

export default AdminProperties;