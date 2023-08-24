import BaseError from './BaseError';

class LikeError extends BaseError {
  constructor(message) {
    super(message || 'O usuário já curtiu o cartão.');
    this.name = 'LikeError';
    this.statusCode = 409;
  }
}

export default LikeError;
