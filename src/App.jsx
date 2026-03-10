import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Introduction from './pages/Introduction';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import ProtectedRoute from './components/ProtectedRoute';
import { ComplaintProvider } from './context/ComplaintContext';
import './App.css';

function App() {
  return (
    <ComplaintProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/student/login" element={<Login role="student" />} />
          <Route path="/student/signup" element={<Signup role="student" />} />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/login" element={<Login role="admin" />} />
          <Route path="/admin/signup" element={<Signup role="admin" />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback routes for previous direct dashboard links temporarily */}
          <Route path="/student" element={
            <ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ComplaintProvider>
  );
}

export default App;
