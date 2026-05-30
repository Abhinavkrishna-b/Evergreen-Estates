import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Homepage from './routes/Homepage/Homepage';
import PropertiesPage from './routes/PropertiesPage/PropertiesPage';
import PropertyDetails from './routes/PropertyDetails/PropertyDetails';
import SignupPage from './routes/SignupPage/SignupPage';
import AdminSignup from './routes/AdminSignup/AdminSignup';
import LoginPage from './routes/LoginPage/LoginPage';
import AdminLogin from './routes/AdminLogin/AdminLogin';
import ContactPage from './routes/ContactPage/ContactPage';
import AboutPage from './routes/AboutPage/AboutPage';
import UserProfile from './routes/UserProfile/UserProfile';
import SellerProfile from './routes/SellerProfile/SellerProfile';
import AdminDashboard from './routes/AdminDashboard/AdminDashboard';
import AdminProperties from './routes/AdminProperties/AdminProperties';
import AdminVerification from './routes/AdminVerification/AdminVerification';
import AdminUsers from './routes/AdminUsers/AdminUsers';

function App() {
	return (
		<BrowserRouter>

      <ScrollToTop/>
      
      <div className="app">
        <main className="main-content">

          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="/properties"element={<PropertiesPage />} />

            <Route path="/about" element={<AboutPage />} />
            
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/admin/properties/:id" element={<PropertyDetails isAdmin={true} />} /> 
            {/* For the admin we don't need the navbar, action buttons and footer */}

            <Route path="/signup" element={<SignupPage />} />

            <Route path="/admin-signup" element={<AdminSignup />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            {/* Only developers and admins can manually type this url and get admin access */}

            <Route path="/login" element={<LoginPage />} />

            <Route path="/profile" element={<UserProfile />} />

            <Route path="/seller-profile" element={<SellerProfile />} />

            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/admin/properties" element={<AdminProperties />} />

            <Route path="/admin/verifications" element={<AdminVerification />} />

            <Route path="/admin/users" element={<AdminUsers />} />

            <Route path="*" element={
              <div style={{ padding: '100px', textAlign: 'center', color: '#1a1a2e' }}>
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            } />
          </Routes>

        </main>
      </div>
    </BrowserRouter>
	);
}

export default App;