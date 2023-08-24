import BaseError from './BaseError';

class AuthError extends BaseError {
  constructor(message) {
    super(message || 'Falha na autenticação');
    this.name = 'AuthError';
    this.statusCode = 401;
  }
}

export default AuthError;
