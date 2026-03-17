import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-page">
      {/* Background effects */}
      <div className="nf-orb nf-orb-1" />
      <div className="nf-orb nf-orb-2" />
      <div className="nf-grid" />

      <div className="nf-content">
        {/* Glitch 404 */}
        <motion.div
          className="nf-code"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
        >
          <span className="nf-four nf-left">4</span>
          <motion.span
            className="nf-zero"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            0
          </motion.span>
          <span className="nf-four nf-right">4</span>
        </motion.div>

        {/* Text */}
        <motion.h1
          className="nf-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className="nf-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          Looks like this page took a detour. Let's get you back on track.
        </motion.p>

        {/* Terminal block */}
        <motion.div
          className="nf-terminal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="nf-terminal-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="nf-terminal-title">bash</span>
          </div>
          <div className="nf-terminal-body">
            <span className="nf-prompt">$ </span>
            <span className="nf-cmd">find / -name "page-you-wanted"</span>
            <br />
            <span className="nf-output">find: No such file or directory</span>
            <br />
            <span className="nf-prompt">$ </span>
            <span className="nf-cmd nf-blink">cd ~</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="nf-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <Link to="/" className="btn-primary-custom">
            <i className="bi bi-house-fill" />
            Go Home
          </Link>
          <a href="mailto:kishorshelar@gmail.com" className="btn-outline-custom">
            <i className="bi bi-envelope" />
            Contact Me
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
