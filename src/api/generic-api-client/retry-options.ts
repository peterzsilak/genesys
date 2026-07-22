export interface RetryOptions {
    readonly maxAttempts: number;
    readonly delayMs: number;
    readonly backoffFactor: number;
}

export const defaultRetryOptions: RetryOptions = {
    maxAttempts: 1,
    delayMs: 0,
    backoffFactor: 1,
};
