import './AdminVerification.css';

import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import VerificationTable from '../../components/VerificationTable/VerificationTable';

const AdminVerification = () => {
  return (
    <div className="admin-verification-page">

      <AdminSidebar />

      <div className="admin-verification-content">

        <div className="admin-verification-header">

          <div>
            <h1>Verification</h1>
            <p>Review pending property submissions.</p>
          </div>

        </div>

        <VerificationTable />

      </div>

    </div>
  );
};

export default AdminVerification;