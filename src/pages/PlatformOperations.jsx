import { useState, useEffect } from 'react';
import { getStats } from '../api/admin';
import '../styles/PlatformOperations.css';

const PlatformOperations = () => {
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
    return <div className="loading">Loading platform data...</div>;
  }

  return (
    <div className="platform-operations-page">
      <div className="page-header">
        <h1>Platform Operations</h1>
      </div>

      <div className="operations-grid">
        <div className="operation-card">
          <h3>User Growth</h3>
          <div className="operation-stats">
            <div className="stat-item">
              <span className="stat-label">Total Users</span>
              <span className="stat-value">{stats?.users?.total || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Regular Users</span>
              <span className="stat-value">{stats?.users?.regular || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Sellers</span>
              <span className="stat-value">{stats?.users?.sellers || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Admins</span>
              <span className="stat-value">{stats?.users?.admins || 0}</span>
            </div>
          </div>
        </div>

        <div className="operation-card">
          <h3>System Health</h3>
          <div className="health-items">
            <div className="health-item status-good">
              <span>Database</span>
              <span className="health-indicator">🟢 Healthy</span>
            </div>
            <div className="health-item status-good">
              <span>API Server</span>
              <span className="health-indicator">🟢 Running</span>
            </div>
            <div className="health-item status-good">
              <span>WebRTC</span>
              <span className="health-indicator">🟢 Active</span>
            </div>
          </div>
        </div>

        <div className="operation-card">
          <h3>Storage & Resources</h3>
          <div className="resource-items">
            <div className="resource-item">
              <span>Recordings Storage</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '45%' }}></div>
              </div>
              <span className="resource-value">45% (4.5 GB / 10 GB)</span>
            </div>
            <div className="resource-item">
              <span>Media Assets</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '32%' }}></div>
              </div>
              <span className="resource-value">32% (3.2 GB / 10 GB)</span>
            </div>
          </div>
        </div>

        <div className="operation-card">
          <h3>Recent Activity</h3>
          <div className="activity-log">
            {stats?.recentActivity?.length > 0 ? (
              stats.recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <span className="activity-time">
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                  <span className="activity-description">{activity.description}</span>
                </div>
              ))
            ) : (
              <p className="no-activity">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformOperations;
