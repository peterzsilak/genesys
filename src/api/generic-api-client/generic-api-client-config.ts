import type { RetryOptions } from "@/api/generic-api-client/retry-options";

export interface GenericApiClientConfig {
    readonly baseUrl: string;
    readonly retry?: RetryOptions;
    readonly timeout?: number;
    readonly defaultHeaders?: Record<string, string>;
}
