const BaseError = require('./BaseError');

class DislikeError extends BaseError {
  constructor(message) {
    super(message || 'O cartão ainda não foi curtido.');
    this.name = 'DislikeError';
    this.statusCode = 409;
  }
}

module.exports = DislikeError;
