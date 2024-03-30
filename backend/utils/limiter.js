const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'You have reached the request limit. Please try again later',
});

module.exports = limiter;
