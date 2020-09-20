/**
 * Log file
 * It uses winston library to log
 * If in production, the output goes to a log file (output.log)
 * Otherwise it uses the console
 */
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, splat, prettyPrint} = format;

// Log level, in dev env it uses DEBUG as default
const logLevel = process.env.LOG_LEVEL || 'info';

const logger = createLogger({
  level: logLevel,
  format: combine(
    timestamp(),
    splat(),
    prettyPrint()
  )
});

// If production use file to log
/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
    console.log("Logging using file output.log");
    logger.add(new transports.File({
        filename: 'output.log' 
     }));
} else { // otherwise use console
    logger.add(new transports.Console({
        format: format.simple(),
    }));
}

logger.info("Logger level: "+ logLevel);


module.exports = logger;