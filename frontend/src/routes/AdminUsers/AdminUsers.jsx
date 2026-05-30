import './AdminUsers.css';

import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import UserManagementTable from '../../components/UserManagementTable/UserManagementTable';

const AdminUsers = () => {
  return (
    <div className="admin-users-page">

      <AdminSidebar />

      <div className="admin-users-content">

        <div className="admin-users-header">

          <div>
            <h1>Users</h1>
            <p>Manage registered platform users.</p>
          </div>

        </div>

        <UserManagementTable />

      </div>

    </div>
  );
};

export default AdminUsers;