const winston = require('winston');

// Logger configuration
const logConfiguration = {
    'transports': [
        // new winston.transports.Console(),
        new winston.transports.Console({
            level: 'verbose'
        }),
        new winston.transports.File({
            level: 'info',
            filename: './logs/info.log'
        }),

        new winston.transports.File({
            level: 'error',
            filename: './logs/error.log'
        })
    ]
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

module.exports = logger;
