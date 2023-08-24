import BaseError from './BaseError';

class CardNotFoundError extends BaseError {
  constructor(message) {
    super(message || 'Cartão não encontrado');
    this.name = 'CardNotFoundError';
    this.statusCode = 404;
  }
}

export default CardNotFoundError;
