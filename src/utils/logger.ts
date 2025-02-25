import winston from 'winston';

/**
 * Sets up the logger for the application
 * @returns Winston logger instance
 */
export function setupLogger() {
    const logLevel = process.env.LOG_LEVEL || 'info';

    const logger = winston.createLogger({
        level: logLevel,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        defaultMeta: { service: 'toshl-mcp-server' },
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        ]
    });

    return logger;
}

// Create a default logger instance
const logger = setupLogger();

export default logger;
