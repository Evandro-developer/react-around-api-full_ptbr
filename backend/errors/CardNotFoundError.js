const BaseError = require('./BaseError');

class CardNotFoundError extends BaseError {
  constructor(message) {
    super(message || 'Card not found');
    this.name = 'CardNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = CardNotFoundError;
