const rateLimit = require('express-rate-limit');

// Configura do limitador de taxa.
// Configure the rate limiter.
const limiter = rateLimit({
  // Define o período de solicitações em 15 minutos.
  // Set the request window to 15 minutes.
  windowMs: 15 * 60 * 1000,
  // Define o número máximo de solicitações por IP.
  // Set the maximum number of requests per IP.
  max: 100,
  message: 'Você atingiu o limite de solicitações. Tente novamente mais tarde.',
});

module.exports = limiter;
