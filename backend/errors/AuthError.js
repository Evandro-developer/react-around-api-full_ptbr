const BaseError = require('./BaseError');

class AuthError extends BaseError {
  constructor(message) {
    super(message || 'Authentication failure');
    this.name = 'AuthError';
    this.statusCode = 401;
  }
}

module.exports = AuthError;
