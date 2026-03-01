import * as Sentry from '@sentry/node';

type LogLevel = 'debug' | 'error' | 'info' | 'trace' | 'warn';
type ConsoleLogLevel = LogLevel | 'assert' | 'log';
type SentryLogLevel = LogLevel | 'fatal';

class Logger {
    public assert(message: string, data?: Record<string, unknown>) {
        this._log('assert', message, data);
    }

    public debug(message: string, data?: Record<string, unknown>) {
        this._log('debug', message, data);
    }

    public error(message: string, data?: Record<string, unknown>) {
        this._log('error', message, data);
    }

    public info(message: string, data?: Record<string, unknown>) {
        this._log('log', message, data);
    }

    public log(message: string, data?: Record<string, unknown>) {
        this._log('log', message, data);
    }

    public trace(message: string, data?: Record<string, unknown>) {
        this._log('trace', message, data);
    }

    public warn(message: string, data?: Record<string, unknown>) {
        this._log('warn', message, data);
    }

    private _log(level: ConsoleLogLevel, message: string, data?: Record<string, unknown>) {
        (console as any)[level](message, data);

        let sentryLogLevel: SentryLogLevel;

        if (level === 'log') {
            sentryLogLevel = 'info';
        } else if (level === 'assert') {
            sentryLogLevel = 'fatal';
        } else {
            sentryLogLevel = level;
        }

        Sentry.logger[sentryLogLevel](message, data);
    }
}

export const logger = new Logger();