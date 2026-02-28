import { useState, useEffect } from 'react';
import { getUsers, assignRole, deleteUser } from '../api/admin';
import { useAuth } from '../context/AuthContext';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const { user: currentUser, isSuperAdmin } = useAuth();

  useEffect(() => {
    loadUsers();
  }, [page, search, roleFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers({ page, limit: 10, search, role: roleFilter });
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!isSuperAdmin) {
      alert('Only superadmins can change user roles');
      return;
    }

    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    try {
      await assignRole(userId, newRole);
      alert('Role updated successfully');
      loadUsers();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!isSuperAdmin) {
      alert('Only superadmins can delete users');
      return;
    }

    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteUser(userId);
      alert('User deleted successfully');
      loadUsers();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to delete user');
    }
  };

  return (
    <div className="user-management-page">
      <div className="page-header">
        <h1>User Management</h1>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="search-input"
        />

        <select 
          value={roleFilter} 
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="filter-select"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Address</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>#{(page - 1) * 10 + index + 1}</td>
                    <td>
                      <div className="user-cell">
                        <img 
                          src={user.imageUrl || '/default-avatar.png'} 
                          alt={user.fullName}
                          className="user-avatar-small"
                        />
                        <span>{user.fullName}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.mobileNumber || 'N/A'}</td>
                    <td>{user.address || 'N/A'}</td>
                    <td>
                      {isSuperAdmin ? (
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className={`role-badge role-${user.role}`}
                          disabled={user.id === currentUser.id}
                        >
                          <option value="user">User</option>
                          <option value="seller">Seller</option>
                          <option value="admin">Admin</option>
                          <option value="superadmin">Superadmin</option>
                        </select>
                      ) : (
                        <span className={`role-badge role-${user.role}`}>
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon btn-call" title="Call">📞</button>
                        {isSuperAdmin && user.id !== currentUser.id && (
                          <button 
                            className="btn-icon btn-delete" 
                            onClick={() => handleDeleteUser(user.id)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination && (
            <div className="pagination">
              <button 
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="pagination-btn"
              >
                ‹ Previous
              </button>
              
              <span className="pagination-info">
                Page {pagination.page} of {pagination.pages} ({pagination.total} users)
              </span>
              
              <button 
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.pages}
                className="pagination-btn"
              >
                Next ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserManagement;
