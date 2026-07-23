import type { APIRequestContext, APIResponse } from "@playwright/test";
import type winston from "winston";

import { ApiError } from "@/api/generic-api-client/error-handler/api-error";
import type { ApiErrorHandler } from "@/api/generic-api-client/error-handler/api-error-handler";
import type { HttpMethod } from "@/api/generic-api-client/http-method";
import {
    type RetryOptions,
    defaultRetryOptions,
} from "@/api/generic-api-client/retry-options";

export interface ApiRequestConfig {
    readonly method: HttpMethod;
    readonly url: string;
    readonly headers?: Record<string, string>;
    readonly body?: unknown;
    readonly timeout?: number;
}

interface ParsedResponse {
    readonly parsedBody: unknown;
    readonly text: string;
}

export class ApiRequestBuilder<TResponse> {
    constructor(
        private readonly request: APIRequestContext,
        private readonly logger: winston.Logger,
        private readonly errorHandler: ApiErrorHandler,
        private readonly retryOptions: RetryOptions = defaultRetryOptions,
    ) {}

    async send(config: ApiRequestConfig): Promise<TResponse> {
        const { maxAttempts } = this.retryOptions;
        let lastError: ApiError | undefined;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            const start = Date.now();
            this.logger.debug(
                `Request: ${config.method} ${config.url} (attempt ${attempt}/${maxAttempts})`,
            );

            const response = await this.execute(config);
            const { parsedBody, text } = await this.parseBody(response);
            this.logger.debug(
                `Response: ${response.status()} ${config.url} in ${Date.now() - start}ms`,
            );

            if (response.ok()) {
                return parsedBody as TResponse;
            }

            lastError = this.buildError(response, parsedBody, text, config);
            if (await this.shouldStop(lastError, attempt)) {
                throw lastError;
            }
        }

        throw lastError ?? new Error("Unknown API error");
    }

    private async execute(config: ApiRequestConfig): Promise<APIResponse> {
        return this.request.fetch(config.url, {
            method: config.method,
            ...(config.headers ? { headers: config.headers } : {}),
            ...(config.body !== undefined ? { data: config.body } : {}),
            ...(config.timeout !== undefined
                ? { timeout: config.timeout }
                : {}),
        });
    }

    private async parseBody(response: APIResponse): Promise<ParsedResponse> {
        const text = await response.text();
        const contentType = response.headers()["content-type"] ?? "";
        if (!contentType.includes("application/json")) {
            return { parsedBody: text, text };
        }
        try {
            return { parsedBody: JSON.parse(text), text };
        } catch {
            return { parsedBody: text, text };
        }
    }

    private buildError(
        response: APIResponse,
        parsedBody: unknown,
        text: string,
        config: ApiRequestConfig,
    ): ApiError {
        try {
            this.errorHandler.handleError({
                status: response.status(),
                url: response.url(),
                body: parsedBody,
                text,
                request: {
                    method: config.method,
                    url: config.url,
                    ...(config.headers ? { headers: config.headers } : {}),
                    body: config.body,
                },
            });
        } catch (error) {
            if (error instanceof ApiError) {
                return error;
            }
            throw error;
        }
        throw new Error("ErrorHandler did not throw an exception");
    }

    private async shouldStop(
        error: ApiError,
        attempt: number,
    ): Promise<boolean> {
        const { maxAttempts, delayMs, backoffFactor } = this.retryOptions;
        if (!error.retryable || attempt >= maxAttempts) {
            return true;
        }
        this.logger.warn(
            `Retrying after status ${error.status}, next attempt ${attempt + 1}/${maxAttempts}`,
        );
        const effectiveDelay = delayMs * backoffFactor ** (attempt - 1);
        if (effectiveDelay > 0) {
            await new Promise((resolve) => setTimeout(resolve, effectiveDelay));
        }
        return false;
    }
}
