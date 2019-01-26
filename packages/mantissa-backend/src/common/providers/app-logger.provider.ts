import { LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, LoggerOptions, transports } from 'winston';
import { formatError } from '../helpers/pretty-error';
import { Env } from './env.provider';

interface ILoggerOptions extends LoggerOptions{
  env: Env
}

export class AppLogger implements LoggerService {
  public static getInstance(options?: ILoggerOptions): LoggerService {
    return this.instance || (this.instance = new this(options));
  }

  private static instance: LoggerService;
  private logger: Logger;

  constructor(private readonly options?: ILoggerOptions) {
    const myFormat = format.printf(info => {
      return `${info.timestamp} ${info.level}: ${info.message}`
    });

    const defaultFormat = format.combine(
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.colorize(),
      format.prettyPrint(),
      myFormat
    );

    const defaultOptions = {
      format: defaultFormat,
      level: this.getLogLevel(),
      transports: [
        new transports.Console({ format: defaultFormat })
      ],
      ...options
    };

    this.logger = createLogger(defaultOptions);
  }

  public log(message: any) {
    this.logger.info(message);
  }

  public error(message: any) {
    if (this.options && this.options.env && this.options.env.isDevelopment()) {
      this.logger.error(formatError(message));
      return;
    }

    this.logger.error(message);
  }

  public warn(message: any) {
    this.logger.warn(message);
  }

  private getLogLevel(): string {
    let level = 'info';

    if (this.options && this.options.env && this.options.env.isDevelopment()) {
      level = 'debug';
    }

    return level;
  }
}
