import winston from 'winston';
import LogFormatter from './logger.formatter';

const ActionsLogger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'action' },
	transports: [
		new winston.transports.File({ filename: 'logs/actions-error.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs/actions-combined.log' }),
		new winston.transports.File({ filename: 'logs/all-combined.log' }),
		new winston.transports.Console({ format: LogFormatter })
	]
});

export default ActionsLogger;
