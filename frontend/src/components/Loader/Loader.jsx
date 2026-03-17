import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="loader-content">
        {/* Logo animation */}
        <motion.div
          className="loader-logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
        >
          <span className="logo-k">K</span>
          <span className="logo-s">S</span>
        </motion.div>

        {/* Name */}
        <motion.p
          className="loader-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Kishor Shelar
        </motion.p>

        {/* Progress bar */}
        <motion.div className="loader-progress-track">
          <motion.div
            className="loader-progress-bar"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Loading dots */}
        <motion.div
          className="loader-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {['Initializing', 'Loading assets', 'Almost ready'].map((text, i) => (
            <motion.span
              key={text}
              className="loader-dot-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: i * 0.7, duration: 0.6, repeat: 0 }}
            >
              {text}...
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Background grid */}
      <div className="loader-grid" />
    </motion.div>
  );
};

export default Loader;
