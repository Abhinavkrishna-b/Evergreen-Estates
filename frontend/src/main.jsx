import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </AuthProvider>
  </StrictMode>
);
