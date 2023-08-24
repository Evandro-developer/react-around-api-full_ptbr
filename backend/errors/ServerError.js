import BaseError from './BaseError';

class ServerError extends BaseError {
  constructor(message) {
    super(message || 'Erro interno do servidor');
    this.name = 'ServerError';
    this.statusCode = 500;
  }
}

export default ServerError;
