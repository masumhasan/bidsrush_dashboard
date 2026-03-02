import { useState, useEffect } from 'react';
import { getStores, toggleStoreStatus } from '../api/stores';
import '../styles/StoreManagement.css';

const StoreManagement = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, active, inactive
    const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });

    useEffect(() => {
        fetchStores();
    }, [filter]);

    const fetchStores = async () => {
        setLoading(true);
        try {
            const params = { page: 1, limit: 50 };
            if (filter !== 'all') params.status = filter;
            const data = await getStores(params);
            setStores(data.stores || []);
            setPagination(data.pagination || { page: 1, total: 0, pages: 1 });
        } catch (error) {
            console.error('Error fetching stores:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (storeId) => {
        try {
            await toggleStoreStatus(storeId);
            fetchStores();
        } catch (error) {
            console.error('Error toggling store status:', error);
        }
    };

    const activeCount = stores.filter(s => s.isActive).length;
    const inactiveCount = stores.filter(s => !s.isActive).length;

    return (
        <div className="store-management">
            <h1>Store Management</h1>

            {/* Stats */}
            <div className="store-stats">
                <div className="stat-card">
                    <div className="stat-label">Total Stores</div>
                    <div className="stat-value">{pagination.total}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Active</div>
                    <div className="stat-value">{activeCount}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Inactive</div>
                    <div className="stat-value">{inactiveCount}</div>
                </div>
            </div>

            {/* Filters */}
            <div className="store-filters">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => setFilter('active')}
                >
                    Active
                </button>
                <button
                    className={filter === 'inactive' ? 'active' : ''}
                    onClick={() => setFilter('inactive')}
                >
                    Inactive
                </button>
            </div>

            {/* Table */}
            {loading ? (
                <div className="loading-state">Loading stores...</div>
            ) : stores.length === 0 ? (
                <div className="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <p>No stores found</p>
                </div>
            ) : (
                <div className="stores-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Store</th>
                                <th>Seller ID</th>
                                <th>Products</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stores.map((store) => (
                                <tr key={store._id}>
                                    <td>
                                        <div className="store-name-cell">
                                            <div className="store-logo">
                                                {store.logoUrl ? (
                                                    <img src={store.logoUrl} alt={store.name} />
                                                ) : (
                                                    '🏪'
                                                )}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{store.name}</div>
                                                {store.description && (
                                                    <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                                                        {store.description.substring(0, 50)}
                                                        {store.description.length > 50 ? '...' : ''}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: '12px', color: '#666' }}>
                                        {store.sellerId.substring(0, 20)}...
                                    </td>
                                    <td>{store.productCount || 0}</td>
                                    <td>
                                        <span className={`status-badge ${store.isActive ? 'active' : 'inactive'}`}>
                                            {store.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '13px', color: '#666' }}>
                                        {new Date(store.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <button
                                            className={`toggle-btn ${store.isActive ? 'deactivate' : 'activate'}`}
                                            onClick={() => handleToggleStatus(store._id)}
                                        >
                                            {store.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StoreManagement;
