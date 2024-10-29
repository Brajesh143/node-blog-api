const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Default logging level
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.json() // Log in JSON format
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: new Date().toJSON().slice(0, 10)+'.log' }), // Log errors to a file
  ]
});

module.exports = logger;
