import type { GenericApiClientConfig } from "../generic-api-client/generic-api-client-config";

export const usersRestClientConfig: GenericApiClientConfig = {
    baseUrl: "https://jsonplaceholder.typicode.com",
    timeout: 10_000,
    retry: {
        maxAttempts: 3,
        delayMs: 500,
        backoffFactor: 2,
    },
};
