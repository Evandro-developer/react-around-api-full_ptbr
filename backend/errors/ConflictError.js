import BaseError from './BaseError';

class ConflictError extends BaseError {
  constructor(message) {
    super(message || 'Conflito detectado');
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

export default ConflictError;
