const rateLimit = require('express-rate-limit');
const { rateLimiter } = require('../config');

const limiter = rateLimit({
  windowMs: rateLimiter.windowMs,
  max: rateLimiter.max,
  message: {
    success: false,
    message: 'Too many requests – please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
