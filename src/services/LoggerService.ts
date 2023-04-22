import winston from 'winston'
import path from 'path'
import DailyRotateFile = require("winston-daily-rotate-file")

class LoggerService {
    private static instance: LoggerService
    private logger: winston.Logger

    private constructor() {
        const logDir = path.join(__dirname, '../../Log')
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'ts-wscore' },
            transports: [
                new winston.transports.Console(),
                new DailyRotateFile({
                    filename: path.join(logDir, '%DATE%.log'),
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ],
        })
    }

    public static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService()
        }

        return LoggerService.instance
    }

    public log(message: string): void {
        this.logger.log('info', message)
    }

    public error(message: string): void {
        this.logger.log('error', message)
    }

    public warn(message: string): void {
        this.logger.log('warn', message)
    }

    public info(message: string, args?: any): void {
        this.logger.log('info', message, args)
    }
}

export default LoggerService.getInstance()
