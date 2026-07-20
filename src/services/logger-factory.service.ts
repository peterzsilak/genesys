import winston from "winston";

export interface LoggerOptions {
    readonly level?: string;
    readonly console?: boolean;
}

const DEFAULT_LEVEL = "info";

export class LoggerFactoryService {
    private readonly baseOptions: LoggerOptions;

    constructor(options: LoggerOptions = {}) {
        this.baseOptions = options;
    }

    createLogger(scope: string, overrides: LoggerOptions = {}): winston.Logger {
        const level =
            overrides.level ?? this.baseOptions.level ?? DEFAULT_LEVEL;
        const useConsole =
            overrides.console ?? this.baseOptions.console ?? true;

        return winston.createLogger({
            level,
            defaultMeta: { scope },
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(
                    ({
                        timestamp,
                        level: logLevel,
                        message,
                        scope: metaScope,
                    }) =>
                        `${String(timestamp)} [${String(metaScope)}] ${logLevel}: ${String(message)}`,
                ),
            ),
            transports: useConsole
                ? [new winston.transports.Console()]
                : [new winston.transports.Console({ silent: true })],
        });
    }
}
