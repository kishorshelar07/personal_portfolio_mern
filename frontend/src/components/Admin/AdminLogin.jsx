import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { authAPI } from '../../utils/api';
import './Admin.css';

const AdminLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.login(form);
      localStorage.setItem('portfolio_token', res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-bg">
      <div className="admin-orb orb-1" />
      <div className="admin-orb orb-2" />
      <div className="admin-grid" />

      <motion.div
        className="admin-login-card glass-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="admin-logo-wrap"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
        >
          <div className="logo-box">KS</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="admin-label">ADMIN PORTAL</p>
          <h1 className="admin-login-title">Welcome back</h1>
          <p className="admin-login-sub">Sign in to access your dashboard</p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="admin-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="admin-field">
            <label><i className="bi bi-person" /> Username</label>
            <input type="text" placeholder="kishor_admin" value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required />
          </div>

          <div className="admin-field">
            <label><i className="bi bi-lock" /> Password</label>
            <div className="admin-pass-wrap">
              <input type={showPass ? 'text' : 'password'} placeholder="••••••••"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)} tabIndex={-1}>
                <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} />
              </button>
            </div>
          </div>

          {error && (
            <motion.div className="admin-error" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <i className="bi bi-exclamation-circle" /> {error}
            </motion.div>
          )}

          <motion.button type="submit" className="btn-primary-custom admin-submit"
            disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}>
            {loading ? <><span className="spinner" /> Signing in...</> : <><i className="bi bi-box-arrow-in-right" /> Sign In</>}
          </motion.button>
        </motion.form>

        <p className="admin-back-link">
          <a href="/"><i className="bi bi-arrow-left" /> Back to Portfolio</a>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
