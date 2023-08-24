import BaseError from './BaseError';

class UnauthorizedError extends BaseError {
  constructor(message) {
    super(message || 'Não autorizado');
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

export default UnauthorizedError;
