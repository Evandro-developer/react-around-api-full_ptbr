const BaseError = require('./BaseError');

class EmailAlreadyInUseError extends BaseError {
  constructor(message) {
    super(message || 'O e-mail já está em uso');
    this.name = 'EmailAlreadyInUseError';
    this.statusCode = 400;
  }
}

module.exports = EmailAlreadyInUseError;
