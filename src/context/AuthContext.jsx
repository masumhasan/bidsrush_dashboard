import { createContext, useState, useContext, useEffect } from 'react';
import { adminLogin as apiAdminLogin, getAdminMe } from '../api/admin';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    const savedUser = localStorage.getItem('adminUser');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        // Verify token is still valid
        getAdminMe()
          .then((data) => {
            setUser(data);
            localStorage.setItem('adminUser', JSON.stringify(data));
          })
          .catch(() => {
            // Token invalid, clear storage
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            setUser(null);
          })
          .finally(() => setLoading(false));
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await apiAdminLogin(email, password);
    
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminUser', JSON.stringify(data.user));
    
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === 'superadmin',
    isAdmin: user?.role === 'admin' || user?.role === 'superadmin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
