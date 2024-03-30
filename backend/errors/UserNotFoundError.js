const BaseError = require('./BaseError');

class UserNotFoundError extends BaseError {
  constructor(message) {
    super(message || 'Error, user not found');
    this.name = 'UserNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = UserNotFoundError;
