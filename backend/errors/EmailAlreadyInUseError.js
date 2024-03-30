const BaseError = require('./BaseError');

class EmailAlreadyInUseError extends BaseError {
  constructor(message) {
    super(message || 'The email is already in use');
    this.name = 'EmailAlreadyInUseError';
    this.statusCode = 400;
  }
}

module.exports = EmailAlreadyInUseError;
