const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const celebrate = require('celebrate');
const { httpRequestLogger, httpErrorLogger } = require('./middleware/logger');
const auth = require('./middleware/auth');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const BaseError = require('./errors/BaseError');
const {
  validateUserSignup,
  validateUserLogin,
} = require('./utils/validations');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      'https://api.aroundfinal.com.br',
      'https://aroundfinal.com.br',
      'https://www.aroundfinal.com.br',
    ],
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://127.0.0.1:27017/aroundb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexão com o MongoDB bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro na conexão com o MongoDB:', error);
  });

app.use(httpRequestLogger);

// Server crash testing for review
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);

app.post('/signup', validateUserSignup, createUser);
app.post('/signin', validateUserLogin, login);

app.use(httpErrorLogger);

// Tratador de erros de validação do Celebrate
app.use((err, req, res, next) => {
  if (celebrate.isCelebrateError(err)) {
    const errors = err.details;
    let errorMessage = 'Erro de validação: ';
    errors.forEach(({ message }) => {
      errorMessage += `${message}, `;
    });
    return res.status(400).json({ error: errorMessage });
  }
  next(err);
  return null;
});

// Tratador de erros personalizado
app.use((err, req, res, next) => {
  if (err instanceof BaseError) {
    // Verifica se é uma instância de BaseError
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err.stack);
  return res.status(500).json({ message: 'Erro Interno do Servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escutando em http://127.0.0.1:${PORT}`);
});

module.exports = app;

// app.listen(PORT, IP, () => {
//   console.log(`Servidor escutando em http://${IP}:${PORT}`);
// });

// const IP = process.env.IP || "0.0.0.0";

// const corsOptions = {
//   origin: "http://localhost:3000", // Ou qualquer outra origem que você precisa permitir
//   optionsSuccessStatus: 200, // Algumas versões do CORS exigem esse campo
// };

// app.options("*", cors(corsOptions));
// app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin: "http://localhost:3000", // Ou qualquer outra origem que você precisa permitir
//   })
// );
