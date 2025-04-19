import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ApplicationForm from './components/ApplicationForm';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const ProtectedRoute = ({ children, allowedRoles = ['user', 'admin'] }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Redirect admin to admin dashboard if trying to access user dashboard
    if (userRole === 'admin' && window.location.pathname === '/dashboard') {
      return <Navigate to="/admin-dashboard" replace />;
    }
    // Redirect user to user dashboard if trying to access admin dashboard
    if (userRole === 'user' && window.location.pathname === '/admin-dashboard') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/apply"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <ApplicationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App; 