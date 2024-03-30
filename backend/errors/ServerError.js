const BaseError = require('./BaseError');

class ServerError extends BaseError {
  constructor(message) {
    super(message || 'An error occurred on the server');
    this.name = 'ServerError';
    this.statusCode = 500;
  }
}

module.exports = ServerError;
