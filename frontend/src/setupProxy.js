/**
 * src/setupProxy.js
 *
 * CRA automatically picks this file up — no import needed.
 * Only requests to /api/* are forwarded to the backend.
 * Everything else (favicon, images, JS chunks…) is served by
 * the Webpack dev server as normal.
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      // Optional: log proxy activity in development
      onProxyReq: (proxyReq, req) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[proxy] ${req.method} ${req.path} → :5000`);
        }
      },
      onError: (err, req, res) => {
        console.error('[proxy error]', err.message);
        res.status(502).json({
          error: 'Backend not reachable. Make sure the backend server is running on port 5000.',
        });
      },
    })
  );
};