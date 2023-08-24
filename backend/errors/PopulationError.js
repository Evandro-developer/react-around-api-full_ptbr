import BaseError from './BaseError';

class PopulationError extends BaseError {
  constructor(message) {
    super(message || 'Falha ao preencher o cartão.');
    this.name = 'PopulationError';
    this.statusCode = 500;
  }
}

export default PopulationError;
