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

            <Route path="/signup" element={<SignupPage />} />

            <Route path="/admin-signup" element={<AdminSignup />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            {/* Only developers and admins can manually type this url and get admin access */}

            <Route path="/login" element={<LoginPage />} />
          </Routes>

        </main>
      </div>
    </BrowserRouter>
	);
}

export default App;