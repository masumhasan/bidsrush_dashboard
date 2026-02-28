import { useState, useEffect } from 'react';
import { 
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../api/categories';
import { useAuth } from '../context/AuthContext';
import '../styles/CategoryManagement.css';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    icon: '',
    sortOrder: 0,
    isActive: true
  });
  const { isAdmin, isSuperAdmin } = useAuth();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
      alert('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || '',
        imageUrl: category.imageUrl || '',
        icon: category.icon || '',
        sortOrder: category.sortOrder || 0,
        isActive: category.isActive !== undefined ? category.isActive : true
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        icon: '',
        sortOrder: 0,
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
      icon: '',
      sortOrder: 0,
      isActive: true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }

    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, formData);
        alert('Category updated successfully');
      } else {
        await createCategory(formData);
        alert('Category created successfully');
      }
      handleCloseModal();
      loadCategories();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to save category');
    }
  };

  const handleDelete = async (categoryId, categoryName) => {
    if (!confirm(`Are you sure you want to delete "${categoryName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteCategory(categoryId);
      alert('Category deleted successfully');
      loadCategories();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to delete category');
    }
  };

  const handleToggleActive = async (category) => {
    try {
      await updateCategory(category._id, {
        ...category,
        isActive: !category.isActive
      });
      loadCategories();
    } catch (error) {
      alert('Failed to update category status');
    }
  };

  if (!isAdmin && !isSuperAdmin) {
    return (
      <div className="category-management-page">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You don't have permission to manage categories.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="category-management-page">
      <div className="page-header">
        <h1>Category Management</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + Add Category
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading categories...</div>
      ) : (
        <div className="categories-grid">
          {categories.length === 0 ? (
            <div className="empty-state">
              <p>No categories yet. Create your first category!</p>
            </div>
          ) : (
            categories.map((category) => (
              <div key={category._id} className="category-card">
                <div className="category-header">
                  {category.imageUrl ? (
                    <img 
                      src={category.imageUrl} 
                      alt={category.name} 
                      className="category-image"
                    />
                  ) : (
                    <div className="category-placeholder">
                      {category.icon || '📦'}
                    </div>
                  )}
                  <div className={`status-badge ${category.isActive ? 'active' : 'inactive'}`}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
                
                <div className="category-content">
                  <h3>{category.name}</h3>
                  {category.description && (
                    <p className="category-description">{category.description}</p>
                  )}
                  <div className="category-meta">
                    <span>Sort Order: {category.sortOrder}</span>
                  </div>
                </div>

                <div className="category-actions">
                  <button 
                    className="btn-toggle"
                    onClick={() => handleToggleActive(category)}
                    title={category.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {category.isActive ? '👁️' : '👁️‍🗨️'}
                  </button>
                  <button 
                    className="btn-edit"
                    onClick={() => handleOpenModal(category)}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(category._id, category.name)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label htmlFor="name">Category Name *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Electronics, Fashion, Home & Garden"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the category"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="icon">Icon (Emoji or Text)</label>
                <input
                  type="text"
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="📦 or 🛍️"
                  maxLength="10"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="sortOrder">Sort Order</label>
                  <input
                    type="number"
                    id="sortOrder"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="isActive">Status</label>
                  <select
                    id="isActive"
                    value={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
