import winston from 'winston';
import chalk from 'chalk';

const LogFormatter = winston.format.combine(
	winston.format((info) => {
		info.level = `${info.level.toUpperCase()}`;
		return info;
	})(),
	winston.format.align(),
	winston.format.colorize(),
	winston.format.timestamp(),
	winston.format.printf(({ level, service, message, label, timestamp, ...other }) => {
		let cols = (process?.stdout?.columns ?? 80) - 1;
		let JSONString = JSON.stringify(other, null, ' ');

		if (!level.includes('DEBUG'))
			JSONString = chalk.dim(
				JSON.stringify(other, null, ' ')
					.replace(/\n/g, '')
					.replace(/\s+/g, ' ')
					.substring(0, cols) + '…'
			);
		return `${chalk.dim(timestamp)} ${service}\t${chalk.bold(level)}: ${message}\n${JSONString}`;
	})
);

export default LogFormatter;
