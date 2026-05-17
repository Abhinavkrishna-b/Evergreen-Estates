import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Homepage from './routes/Homepage/Homepage';
import PropertiesPage from './routes/PropertiesPage/PropertiesPage';

function App() {
	return (
		<BrowserRouter>
      <div className="app">
        <main className="main-content">

          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route
              path="/properties"
              element={<PropertiesPage />}
            />
          </Routes>

        </main>
      </div>
    </BrowserRouter>
	);
}

export default App;
