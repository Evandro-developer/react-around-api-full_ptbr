import winston from 'winston';
import expressWinston from 'express-winston';
import fs from 'fs';
import path from 'path';

const LOGS_DIRECTORY = './logs';

// Verifica e cria o diretório de logs se ele não existir
if (!fs.existsSync(LOGS_DIRECTORY)) {
  fs.mkdirSync(LOGS_DIRECTORY);
}

const loggerOptions = (filename) => ({
  transports: [
    new winston.transports.File({
      filename: path.join(LOGS_DIRECTORY, filename),
    }),
  ],
  format: winston.format.json(),
});

export const httpRequestLogger = expressWinston.logger(
  loggerOptions('/request.log'),
);
export const httpErrorLogger = expressWinston.errorLogger(
  loggerOptions('/error.log'),
);
