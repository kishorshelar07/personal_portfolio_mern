const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { validateContact } = require('./middleware/validate');
const { validateLogin }   = require('./middleware/validate');

const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');
const authRoutes    = require('./routes/auth');

const app = express();

// ── Security headers ──────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(mongoSanitize());
app.use(xss());

// ── CORS ──────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// ── Global rate limiter ───────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests – please try again later.' },
});
app.use('/api/', globalLimiter);

// ── Stricter limiter for contact form ─────────────────────
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many contact submissions – please try again in an hour.' },
});

// ── Auth limiter ──────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts – please try again later.' },
});

// ── Body parser ───────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Request logger (development) ──────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// ── Routes ────────────────────────────────────────────────
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authLimiter, authRoutes);

// ── Health check ──────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// ── 404 catch-all ─────────────────────────────────────────
app.use('*', (_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

// ── Global error handler ──────────────────────────────────
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────
const PORT = parseInt(process.env.PORT, 10) || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📌 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});

module.exports = app;
