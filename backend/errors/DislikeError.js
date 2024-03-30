const BaseError = require('./BaseError');

class DislikeError extends BaseError {
  constructor(message) {
    super(message || 'The card has not been liked yet');
    this.name = 'DislikeError';
    this.statusCode = 409;
  }
}

module.exports = DislikeError;
