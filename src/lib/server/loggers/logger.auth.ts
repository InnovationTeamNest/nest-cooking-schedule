import winston from 'winston';
import LogFormatter from './logger.formatter';

const AuthLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'auth' },
  transports: [
    new winston.transports.File({ filename: 'logs/auth-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/auth-combined.log' }),
    new winston.transports.File({ filename: 'logs/all-combined.log' }),
    new winston.transports.Console({ format: LogFormatter })
  ]
});

export default AuthLogger;
