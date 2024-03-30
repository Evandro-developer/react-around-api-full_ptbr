const BaseError = require('./BaseError');

class UnauthorizedError extends BaseError {
  constructor(message) {
    super(message || 'Authorization error');
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
