const validator = require('validator');

/**
 * Middleware to validate contact form input.
 * Attaches sanitised data to req.body.
 */
exports.validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters.');
  }

  if (!email || !validator.isEmail(String(email))) {
    errors.push('Please provide a valid email address.');
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters.');
  }

  if (message && message.trim().length > 1000) {
    errors.push('Message cannot exceed 1000 characters.');
  }

  if (errors.length) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  // Sanitise
  req.body.name    = validator.escape(name.trim());
  req.body.email   = validator.normalizeEmail(email.trim());
  req.body.message = validator.escape(message.trim());

  next();
};

/**
 * Middleware to validate admin login input.
 */
exports.validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length < 2) {
    return res.status(400).json({ error: 'Username is required.' });
  }
  if (!password || typeof password !== 'string' || password.length < 1) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  req.body.username = username.trim().toLowerCase();
  next();
};
