import type { ApiErrorInput } from "@/api/generic-api-client/error-handler/api-error-handler";

export class ApiError extends Error {
    readonly status: number;
    readonly url: string;
    readonly body: unknown;

    constructor(input: ApiErrorInput) {
        super(
            `${input.request.method} ${input.url} failed with status ${input.status}`,
        );
        this.name = "ApiError";
        this.status = input.status;
        this.url = input.url;
        this.body = input.body;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    get retryable(): boolean {
        return this.status >= 500;
    }
}
