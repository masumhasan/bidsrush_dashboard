import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import StreamModeration from './pages/StreamModeration';
import PlatformOperations from './pages/PlatformOperations';
import BusinessManagement from './pages/BusinessManagement';
import ShippingManagement from './pages/ShippingManagement';
import CategoryManagement from './pages/CategoryManagement';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/users" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="streams" element={<StreamModeration />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="operations" element={<PlatformOperations />} />
            <Route path="business" element={<BusinessManagement />} />
            <Route path="shipping" element={<ShippingManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch all - redirect to users */}
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
