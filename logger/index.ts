import { createLogger, format, transports } from 'winston';

const { printf, combine, timestamp, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
	return `${timestamp} ${level}: ${stack || message}`;
});

export const logger = createLogger({
	format: combine(
		errors({ stack: true }),
		colorize(),
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		logFormat
	),
	transports: [new transports.Console()],
});

