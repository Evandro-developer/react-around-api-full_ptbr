const express = require('express');
const {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const {
  validateAuthorizationHeader,
  validateUserId,
  validateUserProfile,
  validateUserAvatar,
} = require('../utils/validations');

const router = express.Router();

// Middleware de validação do cabeçalho de autorização em todas as rotas.
router.use(validateAuthorizationHeader);

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUserProfile, updateUserProfile);
router.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = router;
