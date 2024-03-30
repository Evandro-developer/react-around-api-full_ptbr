const BaseError = require('./BaseError');

class LikeError extends BaseError {
  constructor(message) {
    super(message || 'The user has already liked the card');
    this.name = 'LikeError';
    this.statusCode = 409;
  }
}

module.exports = LikeError;
