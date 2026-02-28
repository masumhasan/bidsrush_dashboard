import { useState, useEffect } from 'react';
import '../styles/BusinessManagement.css';

const BusinessManagement = () => {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    thisMonth: 0,
    lastMonth: 0,
    growth: 0,
  });

  useEffect(() => {
    // TODO: Implement API call to fetch business data
    // For now using placeholder data
    setRevenueData({
      totalRevenue: 45780,
      thisMonth: 12340,
      lastMonth: 10200,
      growth: 20.98,
    });
  }, []);

  return (
    <div className="business-management-page">
      <div className="page-header">
        <h1>Business Management</h1>
      </div>

      <div className="business-grid">
        <div className="business-card">
          <h3>Revenue Overview</h3>
          <div className="revenue-stats">
            <div className="revenue-item primary">
              <span className="revenue-label">Total Revenue</span>
              <span className="revenue-value">${revenueData.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="revenue-item">
              <span className="revenue-label">This Month</span>
              <span className="revenue-value">${revenueData.thisMonth.toLocaleString()}</span>
            </div>
            <div className="revenue-item">
              <span className="revenue-label">Last Month</span>
              <span className="revenue-value">${revenueData.lastMonth.toLocaleString()}</span>
            </div>
            <div className="revenue-item success">
              <span className="revenue-label">Growth</span>
              <span className="revenue-value">+{revenueData.growth}%</span>
            </div>
          </div>
        </div>

        <div className="business-card">
          <h3>Top Sellers</h3>
          <div className="sellers-list">
            <div className="seller-item">
              <span className="seller-rank">1</span>
              <span className="seller-name">Fashion Collection</span>
              <span className="seller-sales">$15,400</span>
            </div>
            <div className="seller-item">
              <span className="seller-rank">2</span>
              <span className="seller-name">Electronics</span>
              <span className="seller-sales">$12,800</span>
            </div>
            <div className="seller-item">
              <span className="seller-rank">3</span>
              <span className="seller-name">Home Decor</span>
              <span className="seller-sales">$9,600</span>
            </div>
            <div className="seller-item">
              <span className="seller-rank">4</span>
              <span className="seller-name">Beauty Products</span>
              <span className="seller-sales">$7,200</span>
            </div>
          </div>
        </div>

        <div className="business-card">
          <h3>Sales by Category</h3>
          <div className="category-breakdown">
            <div className="category-item">
              <span className="category-name">Fashion</span>
              <div className="category-bar">
                <div className="category-fill" style={{ width: '70%' }}></div>
              </div>
              <span className="category-percent">70%</span>
            </div>
            <div className="category-item">
              <span className="category-name">Electronics</span>
              <div className="category-bar">
                <div className="category-fill" style={{ width: '55%' }}></div>
              </div>
              <span className="category-percent">55%</span>
            </div>
            <div className="category-item">
              <span className="category-name">Home & Living</span>
              <div className="category-bar">
                <div className="category-fill" style={{ width: '40%' }}></div>
              </div>
              <span className="category-percent">40%</span>
            </div>
            <div className="category-item">
              <span className="category-name">Beauty</span>
              <div className="category-bar">
                <div className="category-fill" style={{ width: '30%' }}></div>
              </div>
              <span className="category-percent">30%</span>
            </div>
          </div>
        </div>

        <div className="business-card">
          <h3>Commission & Fees</h3>
          <div className="commission-stats">
            <div className="commission-item">
              <span className="commission-label">Platform Commission</span>
              <span className="commission-value">$4,578 (10%)</span>
            </div>
            <div className="commission-item">
              <span className="commission-label">Payment Gateway Fees</span>
              <span className="commission-value">$916 (2%)</span>
            </div>
            <div className="commission-item">
              <span className="commission-label">Net Revenue</span>
              <span className="commission-value success">$40,286</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessManagement;
