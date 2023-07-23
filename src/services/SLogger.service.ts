// Dépendances
import * as winston from 'winston'

// Déconstruction
const { combine, timestamp, printf } = winston.format

enum winstonLevelName {
    ERROR = 'error',
    WARNING = 'warn',
    INFORMATION = 'info',
    HTTP = 'http',
    // VERBOSE = 'verbose',
    DEBUG = 'debug',
    // SILLY = 'silly',
}

// Créez un format de log personnalisé
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} - [ ${level.toUpperCase()} ]: ${message}`
})

// Configuration du logger
export const slogger = winston.createLogger({
    level: 'info', // Niveau de log minimal (info: inclut info, warn et error)
    format: combine(timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), logFormat),
    transports: [
        // info.log
        new winston.transports.File({
            filename: './logs/info.log',
            level: winstonLevelName.INFORMATION, // Logs d'information dans info.log
        }),

        // warn.log
        new winston.transports.File({
            filename: './logs/warn.log',
            level: winstonLevelName.WARNING, // Logs de warning dans warn.log
        }),

        // http.log
        new winston.transports.File({
            filename: './logs/http.log',
            level: winstonLevelName.HTTP, // Logs http dans http.log
        }),

        // debug.log
        new winston.transports.File({
            filename: './logs/debug.log',
            level: winstonLevelName.DEBUG, // Logs de debug dans debug.log
        }),
    ],
})
