import BaseError from './BaseError';

class UserNotFoundError extends BaseError {
  constructor(message) {
    super(message || 'Usuário não encontrado');
    this.name = 'UserNotFoundError';
    this.statusCode = 404;
  }
}

export default UserNotFoundError;
