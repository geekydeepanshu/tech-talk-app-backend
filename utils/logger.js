const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logger = createLogger({
  format: combine(
    timestamp(),
    printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
  transports: [new transports.File({ filename: 'logs/error.log', level: 'error' })],
});

module.exports = logger;
