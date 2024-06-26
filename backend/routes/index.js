const express = require('express');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const auth = require('../middleware/auth');
const { validateAuthorizationHeader } = require('../utils/validations');

const router = express.Router();

// Middleware de validação do cabeçalho de autorização em todas as rotas.
// Middleware for authorization header validation on all routes.
router.use(validateAuthorizationHeader);

router.use('/users', usersRoutes);
router.use('/cards', auth, cardsRoutes);

module.exports = router;
