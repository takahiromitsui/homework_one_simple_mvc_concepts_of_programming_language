import { createLogger, format, transports } from 'winston';

const { printf, combine, timestamp } = format;

const logFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

export const logger = createLogger({
	format: combine(timestamp(), logFormat),
	transports: [new transports.Console()],
});


logger.log('info','test')