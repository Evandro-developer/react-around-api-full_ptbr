const BaseError = require('./BaseError');

class ConflictError extends BaseError {
  constructor(message) {
    super(message || 'Conflict detected');
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
