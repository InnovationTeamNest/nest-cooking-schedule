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

    if (JSONString === '{}') JSONString = '';
    else JSONString = '\n' + JSONString;

    if (!level.includes('DEBUG') && JSONString !== '')
      JSONString = chalk.dim(
        JSON.stringify(other, null, ' ')
          .replace(/\n/g, '')
          .replace(/\s+/g, ' ')
          .substring(0, cols) + (JSONString.length > cols ? '…' : '')
      );

    return `${chalk.dim(timestamp)} ${service}\t${chalk.bold(level)}: ${message}${JSONString}`;
  })
);

export default LogFormatter;
