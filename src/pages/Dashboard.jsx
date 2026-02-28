import { useState, useEffect } from 'react';
import { getStats } from '../api/admin';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-loading">Loading statistics...</div>;
  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">👥</div>
          <div className="stat-content">
            <h3>{stats?.users?.total || 0}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">💰</div>
          <div className="stat-content">
            <h3>100k</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">📦</div>
          <div className="stat-content">
            <h3>5k</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">📹</div>
          <div className="stat-content">
            <h3>{stats?.users?.recent || 0}</h3>
            <p>Active Streams</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section user-breakdown">
          <h2>User Breakdown</h2>
          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>Regular Users</span>
              <span className="breakdown-value">{stats?.users?.regular || 0}</span>
            </div>
            <div className="breakdown-item">
              <span>Admins</span>
              <span className="breakdown-value">{stats?.users?.admins || 0}</span>
            </div>
            <div className="breakdown-item">
              <span>Superadmins</span>
              <span className="breakdown-value">{stats?.users?.superadmins || 0}</span>
            </div>
          </div>
        </div>

        <div className="section growth-chart">
          <h2>Growth</h2>
          <div className="chart-placeholder">
            <p>Chart visualization would go here</p>
            <p>Consider using recharts library for graphs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
