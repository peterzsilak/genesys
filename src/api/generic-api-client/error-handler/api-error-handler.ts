export interface ApiErrorRequest {
    readonly method: string;
    readonly url: string;
    readonly headers?: Record<string, string>;
    readonly body?: unknown;
}

export interface ApiErrorInput {
    readonly status: number;
    readonly url: string;
    readonly body: unknown;
    readonly text: string;
    readonly request: ApiErrorRequest;
}

export interface ApiErrorHandler {
    handleError(input: ApiErrorInput): never;
}
