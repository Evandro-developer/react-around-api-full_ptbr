import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { celebrate } from 'celebrate';
import { httpRequestLogger, httpErrorLogger } from './middleware/logger';
import auth from './middleware/auth';
import usersRoutes from './routes/users';
import cardsRoutes from './routes/cards';
import { createUser, login } from './controllers/users';
import BaseError from './errors/BaseError';
import { validateUserSignup, validateUserLogin } from './utils/validations';

const app = express();

app.use(cors());
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
  .connect('mongodb://localhost:27017/aroundb', {
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

export default app;
