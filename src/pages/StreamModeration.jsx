import { useState, useEffect } from 'react';
import { getStreams } from '../api/admin';
import '../styles/StreamModeration.css';

const StreamModeration = () => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadStreams();
  }, [page]);

  const loadStreams = async () => {
    try {
      setLoading(true);
      const data = await getStreams({ page, limit: ITEMS_PER_PAGE });
      setStreams(data || []);
      setTotalPages(Math.ceil((data?.length || 0) / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Failed to load streams:', error);
      setStreams([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (stream) => {
    if (stream.status === 'active') {
      return { label: 'Active', className: 'status-active' };
    } else if (stream.recording?.fileName) {
      return { label: 'Recorded', className: 'status-recorded' };
    } else {
      return { label: 'No Record', className: 'status-no-record' };
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '2 hours';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? minutes + ' min' : ''}`;
    }
    return `${minutes} min`;
  };

  const formatDate = (date) => {
    if (!date) return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleEdit = (stream) => {
    console.log('Edit stream:', stream.callId);
  };

  const handleDelete = (stream) => {
    if (window.confirm(`Are you sure you want to delete "${stream.title}"?`)) {
      console.log('Delete stream:', stream.callId);
    }
  };

  const handleView = (stream) => {
    console.log('View stream:', stream.callId);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;
    
    // Always show page 1
    pages.push(1);
    
    // Calculate range around current page
    let startPage = Math.max(2, page - 1);
    let endPage = Math.min(totalPages - 1, page + 1);
    
    // Add ellipsis and middle pages
    if (startPage > 2) {
      pages.push('...');
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page if more than 1
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="stream-moderation-page">
      <div className="page-header">
        <h1>Stream Moderation</h1>
      </div>

      {loading ? (
        <div className="loading">Loading streams...</div>
      ) : streams.length === 0 ? (
        <div className="empty-state">
          <p>No streams found</p>
        </div>
      ) : (
        <>
          <div className="streams-table-container">
            <table className="streams-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {streams.map((stream) => {
                  const statusInfo = getStatusInfo(stream);
                  return (
                    <tr key={stream.callId || stream._id}>
                      <td>
                        <div className="stream-title-cell">
                          <div className="stream-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16 20h-8v-2h8v2zm0-18h-8v2h8V2zm-5 4H9v12h2V6zm6 0h-2v12h2V6z"/>
                            </svg>
                          </div>
                          <span className="stream-title-text">{stream.title || 'Untitled Stream'}</span>
                        </div>
                      </td>
                      <td>{formatDuration(stream.recording?.duration)}</td>
                      <td>
                        <div className="date-cell">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '6px'}}>
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                          </svg>
                          {formatDate(stream.createdAt)}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${statusInfo.className}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit-btn"
                            onClick={() => handleEdit(stream)}
                            title="Edit"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                          </button>
                          <button 
                            className="action-btn delete-btn"
                            onClick={() => handleDelete(stream)}
                            title="Delete"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                          </button>
                          <button 
                            className="action-btn view-btn"
                            onClick={() => handleView(stream)}
                            title="View"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-arrow"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ‹
              </button>
              
              {renderPagination().map((p, idx) => (
                p === '...' ? (
                  <span key={`ellipsis-${idx}`} className="pagination-ellipsis">...</span>
                ) : (
                  <button
                    key={p}
                    className={`pagination-number ${page === p ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                )
              ))}
              
              <button 
                className="pagination-arrow"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StreamModeration;
