const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UnauthorizedError = require("../errors/UnauthorizedError");
const UserNotFoundError = require("../errors/UserNotFoundError");
const EmailAlreadyInUseError = require("../errors/EmailAlreadyInUseError");
const ConflictError = require("../errors/ConflictError");

const getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      if (!users) {
        throw new UserNotFoundError();
      }
      return res.json({ users });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new UserNotFoundError();
      }

      const formattedUser = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      };

      return res.json(formattedUser);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new UserNotFoundError(
          "Nenhum usuário com ID correspondente encontrado."
        );
      }
      return res.json(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  console.log("Request Body:", req.body); // Para verificar os dados recebidos na solicitação

  const { name, about, avatar, email, password } = req.body;

  // Primeiro, verifique se o e-mail já está em uso
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new EmailAlreadyInUseError();
      }

      // Se não, continue para criar um novo usuário
      return bcrypt
        .hash(password, 8)
        .then((hash) =>
          User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          })
        )
        .then((savedUser) => res.json(savedUser))
        .catch(next);
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new UserNotFoundError();
      }
      // Verificar se o usuário está tentando atualizar o perfil de outro usuário
      if (user._id.toString() !== userId) {
        throw new UnauthorizedError();
      }

      return User.findByIdAndUpdate(userId, { name, about }, { new: true });
    })
    .then((updatedUser) => res.json(updatedUser))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new UserNotFoundError();
      }

      // Verificar se o usuário está tentando atualizar o avatar de outro usuário
      if (user._id.toString() !== userId) {
        throw new UnauthorizedError();
      }

      return User.findByIdAndUpdate(userId, { avatar }, { new: true });
    })
    .then((updatedUser) => res.json(updatedUser))
    .catch(next);
};

// Essa função 'register' não está sendo utilizada atualmente no projeto.
// No entanto, pode ser útil para futuras implementações onde desejamos que
// o usuário seja redirecionado automaticamente para a página de login
// após o registro bem-sucedido. Ela também gera um token JWT que pode
// ser utilizado para autenticar o usuário imediatamente após o registro.

const register = (req, res, next) => {
  console.log("Request Body:", req.body);
  const { email, password } = req.body;
  const SALT_ROUNDS = 10;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError();
      }

      return bcrypt.hash(password, SALT_ROUNDS);
    })
    .then((hash) => User.create({ email, password: hash }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const response = {
        data: {
          _id: user._id,
          email: user.email,
        },
        token,
        message: "Usuário cadastrado com sucesso.",
      };
      return res.status(201).json(response);
    })
    .catch(next);
};

const login = (req, res, next) => {
  console.log("Request Body:", req.body); // Para verificar os dados recebidos na solicitação
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  register,
  login,
};
