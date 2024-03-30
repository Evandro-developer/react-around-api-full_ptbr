require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const celebrate = require('celebrate');
const { httpRequestLogger, httpErrorLogger } = require('./middleware/logger');
const routes = require('./routes/index');
const BaseError = require('./errors/BaseError');

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
app.use(helmet());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(httpRequestLogger);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successful connection to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(routes);
app.use(httpErrorLogger);

// Tratador de erros de validação do Celebrate.
// Celebrate validation error handler.
app.use((err, req, res, next) => {
  if (celebrate.isCelebrateError(err)) {
    const errors = err.details;
    let errorMessage = 'Validation error: ';
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
