require('dotenv-flow').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const celebrate = require('celebrate');

const limiter = require('./utils/limiter');
const { httpRequestLogger, httpErrorLogger } = require('./middleware/logger');
const routes = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const BaseError = require('./errors/BaseError');
const {
  validateUserSignup,
  validateUserLogin,
} = require('./utils/validations');

const app = express();
const { PORT } = process.env;
const isProduction = process.env.NODE_ENV === 'production';

const corsOptions = {
  origin: [
    'https://api.aroundfinal.com.br',
    'https://reactjs.aroundfinal.com.br',
    'https://www.reactjs.aroundfinal.com.br',
    'https://vanillajs.aroundfinal.com.br',
    'https://www.vanillajs.aroundfinal.com.br',
  ],
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(isProduction ? corsOptions : {}));
app.options('*', cors(isProduction ? corsOptions : {}));

app.use(helmet());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(httpRequestLogger);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexão com o MongoDB bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro na conexão com o MongoDB:', error);
  });

// Aplica o limitador de taxa as rotas /signup e /signin.
// Apply the rate limiter to the /signup and /signin routes.
app.post('/signup', limiter, validateUserSignup, createUser);
app.post('/signin', limiter, validateUserLogin, login);
app.use(routes);

app.use(httpErrorLogger);

// Tratador de erros de validação do Celebrate.
// Celebrate validation error handler.
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

// Tratador de erros personalizado.
// Custom error handler.
app.use((err, req, res, next) => {
  if (err instanceof BaseError) {
    // Verifica se é uma instância de BaseError.
    // Check if it's an instance of BaseError.
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err.stack);
  return res.status(500).json({ message: 'Erro Interno do Servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escutando em http://127.0.0.1:${PORT}`);
});

module.exports = app;
