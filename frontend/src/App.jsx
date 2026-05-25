import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Homepage from './routes/Homepage/Homepage';
import PropertiesPage from './routes/PropertiesPage/PropertiesPage';
import PropertyDetails from './routes/PropertyDetails/PropertyDetails';
import SignupPage from './routes/SignupPage/SignupPage';
import AdminSignup from './routes/AdminSignup/AdminSignup';


function App() {
	return (
		<BrowserRouter>

      <ScrollToTop/>
      
      <div className="app">
        <main className="main-content">

          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route
              path="/properties"
              element={<PropertiesPage />}
            />

            <Route path="/properties/:id" element={<PropertyDetails />} />

            <Route path="/signup" element={<SignupPage />} />

            <Route path="/admin-signup" element={<AdminSignup />} />
            {/* Only developers and admins can manually type this url and get admin access */}
          </Routes>

        </main>
      </div>
    </BrowserRouter>
	);
}

export default App;