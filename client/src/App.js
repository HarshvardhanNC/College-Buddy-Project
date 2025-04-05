import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import StudentDashboard from './components/student/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LostFoundPage from './components/features/lost-found/LostFoundPage';
import EmergencyContactsPage from './components/features/emergency-contacts/EmergencyContactsPage';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Protected Student Routes */}
          <Route
            path="/student/*"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Routes>
                  <Route index element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="lost-found" element={<LostFoundPage />} />
                  <Route path="classes" element={<div>Classes Page (Coming Soon)</div>} />
                  <Route path="cafeteria" element={<div>Cafeteria Page (Coming Soon)</div>} />
                  <Route path="emergency" element={<EmergencyContactsPage />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 