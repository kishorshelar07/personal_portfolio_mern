import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactAPI } from '../../utils/api';
import './Admin.css';

const AdminDashboard = ({ user, onLogout }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await contactAPI.getAll();
      setContacts(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.message.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    read: contacts.filter(c => c.status === 'read').length,
    replied: contacts.filter(c => c.status === 'replied').length,
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  const getStatusColor = (status) => ({
    new: 'status-new',
    read: 'status-read',
    replied: 'status-replied',
  }[status] || 'status-new');

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar glass-card">
        <div className="sidebar-logo">
          <div className="logo-box">KS</div>
          <div>
            <p className="sidebar-name">Kishor Shelar</p>
            <p className="sidebar-role">Administrator</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {[
            { id: 'messages', icon: 'bi-envelope', label: 'Messages', badge: stats.new },
            { id: 'stats', icon: 'bi-bar-chart', label: 'Analytics' },
          ].map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-item${activeTab === item.id ? ' active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.label}</span>
              {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <button className="admin-logout-btn" onClick={onLogout}>
          <i className="bi bi-box-arrow-left" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <div>
            <p className="admin-label">DASHBOARD</p>
            <h2 className="admin-page-title">
              {activeTab === 'messages' ? 'Contact Messages' : 'Analytics'}
            </h2>
          </div>
          <div className="admin-header-right">
            <span className="admin-user-pill">
              <i className="bi bi-person-circle" /> {user?.username}
            </span>
            <button className="admin-refresh-btn" onClick={fetchContacts}>
              <i className="bi bi-arrow-clockwise" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats-grid">
          {[
            { label: 'Total Messages', value: stats.total, icon: 'bi-envelope-fill', color: 'var(--electric-blue)' },
            { label: 'New', value: stats.new, icon: 'bi-bell-fill', color: 'var(--cyan)' },
            { label: 'Read', value: stats.read, icon: 'bi-eye-fill', color: 'var(--violet)' },
            { label: 'Replied', value: stats.replied, icon: 'bi-check-circle-fill', color: 'var(--emerald)' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="admin-stat-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="stat-icon" style={{ color: stat.color }}>
                <i className={`bi ${stat.icon}`} />
              </div>
              <div>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {activeTab === 'messages' && (
          <>
            {/* Search */}
            <div className="admin-search-wrap">
              <i className="bi bi-search search-icon" />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="admin-search"
              />
            </div>

            {/* Messages Table */}
            <div className="admin-table-wrap glass-card">
              {loading ? (
                <div className="admin-loading">
                  <div className="spinner" style={{ width: 32, height: 32 }} />
                  <p>Loading messages...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="admin-empty">
                  <i className="bi bi-inbox" />
                  <p>No messages found</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filtered.map((c, i) => (
                        <motion.tr
                          key={c._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={c.status === 'new' ? 'row-new' : ''}
                        >
                          <td className="td-name">
                            <div className="msg-avatar">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            {c.name}
                          </td>
                          <td className="td-email">
                            <a href={`mailto:${c.email}`}>{c.email}</a>
                          </td>
                          <td className="td-msg">
                            {c.message.length > 60 ? c.message.slice(0, 60) + '...' : c.message}
                          </td>
                          <td className="td-date">{formatDate(c.createdAt)}</td>
                          <td>
                            <span className={`msg-status ${getStatusColor(c.status)}`}>
                              {c.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="view-btn"
                              onClick={() => setSelectedMsg(c)}
                            >
                              <i className="bi bi-eye" /> View
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {activeTab === 'stats' && (
          <div className="admin-analytics glass-card">
            <div className="analytics-grid">
              <div className="analytics-item">
                <p className="admin-label">RESPONSE RATE</p>
                <p className="analytics-big">{stats.total > 0 ? Math.round((stats.replied / stats.total) * 100) : 0}%</p>
                <p className="analytics-sub">Messages replied</p>
              </div>
              <div className="analytics-item">
                <p className="admin-label">PENDING</p>
                <p className="analytics-big" style={{ color: 'var(--cyan)' }}>{stats.new}</p>
                <p className="analytics-sub">Awaiting response</p>
              </div>
              <div className="analytics-item">
                <p className="admin-label">TOTAL REACH</p>
                <p className="analytics-big" style={{ color: 'var(--violet)' }}>{stats.total}</p>
                <p className="analytics-sub">People contacted</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedMsg && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMsg(null)}
          >
            <motion.div
              className="admin-modal glass-card"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="msg-avatar large">{selectedMsg.name.charAt(0).toUpperCase()}</div>
                <div>
                  <h3 className="modal-name">{selectedMsg.name}</h3>
                  <a href={`mailto:${selectedMsg.email}`} className="modal-email">
                    <i className="bi bi-envelope" /> {selectedMsg.email}
                  </a>
                </div>
                <button className="modal-close" onClick={() => setSelectedMsg(null)}>
                  <i className="bi bi-x-lg" />
                </button>
              </div>

              <div className="modal-body">
                <p className="modal-date">
                  <i className="bi bi-calendar3" /> {formatDate(selectedMsg.createdAt)}
                  <span className={`msg-status ${getStatusColor(selectedMsg.status)}`} style={{ marginLeft: 12 }}>
                    {selectedMsg.status}
                  </span>
                </p>
                <div className="modal-message">
                  {selectedMsg.message}
                </div>
              </div>

              <div className="modal-actions">
                <a href={`mailto:${selectedMsg.email}`} className="btn-primary-custom">
                  <i className="bi bi-reply-fill" /> Reply via Email
                </a>
                <button className="btn-outline-custom" onClick={() => setSelectedMsg(null)}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
