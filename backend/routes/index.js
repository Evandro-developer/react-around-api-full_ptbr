const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { validateAuthorizationHeader } = require("../utils/validations");
const usersRoutes = require("./users");
const cardsRoutes = require("./cards");

// Middleware de validação do cabeçalho de autorização em todas as rotas após validateAuthorizationHeader
router.use(validateAuthorizationHeader);

router.use("/users", auth, usersRoutes);
router.use("/cards", auth, cardsRoutes);

module.exports = router;
