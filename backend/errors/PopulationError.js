const BaseError = require('./BaseError');

class PopulationError extends BaseError {
  constructor(message) {
    super(message || 'Failure to fill out the card');
    this.name = 'PopulationError';
    this.statusCode = 500;
  }
}

module.exports = PopulationError;
