const express = require('express');
const limiter = require('../utils/limiter');
const auth = require('../middleware/auth');
const {
  createUser,
  login,
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const {
  validateUserSignup,
  validateUserLogin,
  validateUserId,
  validateUserProfile,
  validateUserAvatar,
} = require('../utils/validations');

const router = express.Router();

// Aplica o limitador de taxa as rotas /signup e /signin.
// Apply the rate limiter to the /signup and /signin routes.
router.post('/signup', limiter, validateUserSignup, createUser);
router.post('/signin', limiter, validateUserLogin, login);
router.get('/', auth, getAllUsers);
router.get('/me', auth, getCurrentUser);
router.get('/:userId', auth, validateUserId, getUserById);
router.patch('/me', auth, validateUserProfile, updateUserProfile);
router.patch('/me/avatar', auth, validateUserAvatar, updateUserAvatar);

module.exports = router;
