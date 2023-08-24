import express from 'express';
import {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users';
import {
  validateAuthorizationHeader,
  validateUserId,
  validateUserProfile,
  validateUserAvatar,
} from '../utils/validations';

const router = express.Router();

// Middleware de validação do cabeçalho de autorização em todas as rotas.
router.use(validateAuthorizationHeader);

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUserProfile, updateUserProfile);
router.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

export default router;
