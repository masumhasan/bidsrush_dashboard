import { useState } from 'react';
import '../styles/ShippingManagement.css';

const ShippingManagement = () => {
  const [orders] = useState([
    {
      id: 'ORD001',
      customer: 'John Doe',
      product: 'Smart Watch',
      status: 'pending',
      date: '2024-01-15',
      amount: 2499,
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      product: 'Wireless Earbuds',
      status: 'shipped',
      date: '2024-01-14',
      amount: 1899,
    },
    {
      id: 'ORD003',
      customer: 'Mike Johnson',
      product: 'Laptop Stand',
      status: 'delivered',
      date: '2024-01-13',
      amount: 899,
    },
  ]);

  const [statusFilter, setStatusFilter] = useState('');

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: 'Pending', className: 'status-pending' },
      processing: { label: 'Processing', className: 'status-processing' },
      shipped: { label: 'Shipped', className: 'status-shipped' },
      delivered: { label: 'Delivered', className: 'status-delivered' },
      cancelled: { label: 'Cancelled', className: 'status-cancelled' },
    };
    return statusMap[status] || { label: status, className: 'status-default' };
  };

  const filteredOrders = statusFilter
    ? orders.filter(order => order.status === statusFilter)
    : orders;

  return (
    <div className="shipping-management-page">
      <div className="page-header">
        <h1>Shipping Management</h1>
      </div>

      <div className="shipping-stats">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div className="stat-content">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">{orders.length}</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⏳</span>
          <div className="stat-content">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{orders.filter(o => o.status === 'pending').length}</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🚚</span>
          <div className="stat-content">
            <span className="stat-label">Shipped</span>
            <span className="stat-value">{orders.filter(o => o.status === 'shipped').length}</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div className="stat-content">
            <span className="stat-label">Delivered</span>
            <span className="stat-value">{orders.filter(o => o.status === 'delivered').length}</span>
          </div>
        </div>
      </div>

      <div className="filters">
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const status = getStatusBadge(order.status);
              return (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>${order.amount.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-view" title="View Details">👁️</button>
                      <button className="btn-icon btn-track" title="Track Shipment">📍</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShippingManagement;
