import type { APIRequestContext } from "@playwright/test";
import type winston from "winston";

import type { LoggerFactoryService } from "../../services/logger-factory.service";
import { ApiRequestBuilder } from "./api-request-builder";
import type { ApiErrorHandler } from "./error-handler/api-error-handler";
import { GenericApiErrorHandler } from "./error-handler/generic-api-error-handler";
import type { GenericApiClientConfig } from "./generic-api-client-config";
import { HttpMethod } from "./http-method";
import { defaultRetryOptions } from "./retry-options";

export interface PollOptions {
    readonly timeoutMs: number;
    readonly intervalMs: number;
}

export class GenericApiClient {
    protected readonly logger: winston.Logger;
    private readonly request: APIRequestContext;
    private readonly config: GenericApiClientConfig;
    private readonly errorHandler: ApiErrorHandler;

    constructor(
        request: APIRequestContext,
        loggerFactory: LoggerFactoryService,
        config: GenericApiClientConfig,
        errorHandler: ApiErrorHandler = new GenericApiErrorHandler(),
    ) {
        this.request = request;
        this.config = config;
        this.errorHandler = errorHandler;
        this.logger = loggerFactory.createLogger(this.constructor.name);
    }

    protected async get<TResponse>(
        path: string,
        headers?: Record<string, string>,
    ): Promise<TResponse> {
        return this.send<TResponse>(HttpMethod.GET, path, undefined, headers);
    }

    protected async post<TResponse>(
        path: string,
        body?: unknown,
        headers?: Record<string, string>,
    ): Promise<TResponse> {
        return this.send<TResponse>(HttpMethod.POST, path, body, headers);
    }

    protected async pollUntil<TResponse>(
        action: () => Promise<TResponse>,
        predicate: (value: TResponse) => boolean,
        options: PollOptions,
    ): Promise<TResponse> {
        const deadline = Date.now() + options.timeoutMs;
        let lastValue: TResponse = await action();
        while (!predicate(lastValue)) {
            if (Date.now() >= deadline) {
                throw new Error(
                    `pollUntil timed out after ${options.timeoutMs}ms`,
                );
            }
            await new Promise((resolve) =>
                setTimeout(resolve, options.intervalMs),
            );
            lastValue = await action();
        }
        return lastValue;
    }

    private async send<TResponse>(
        method: HttpMethod,
        path: string,
        body?: unknown,
        headers?: Record<string, string>,
    ): Promise<TResponse> {
        const builder = new ApiRequestBuilder<TResponse>(
            this.request,
            this.logger,
            this.errorHandler,
            this.config.retry ?? defaultRetryOptions,
        );

        return builder.send({
            method,
            url: new URL(path, this.config.baseUrl).toString(),
            headers: { ...this.config.defaultHeaders, ...headers },
            body,
            ...(this.config.timeout !== undefined
                ? { timeout: this.config.timeout }
                : {}),
        });
    }
}
