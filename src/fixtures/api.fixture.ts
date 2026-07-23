import { test as base, expect } from "@playwright/test";

import { UsersRestClient } from "@/api/users/users-rest-client";
import { LoggerFactoryService } from "@/services/logger-factory.service";
import { UsersService } from "@/services/users-service";

export interface ApiFixtures {
    loggerFactory: LoggerFactoryService;
    usersRestClient: UsersRestClient;
    usersService: UsersService;
}

export const test = base.extend<ApiFixtures>({
    // biome-ignore lint/correctness/noEmptyPattern: Playwright requires an object destructuring pattern for fixtures.
    loggerFactory: async ({}, use) => {
        await use(new LoggerFactoryService());
    },
    usersRestClient: async ({ request, loggerFactory }, use) => {
        await use(new UsersRestClient(request, loggerFactory));
    },
    usersService: async ({ usersRestClient, loggerFactory }, use) => {
        await use(new UsersService(usersRestClient, loggerFactory));
    },
});

export { expect };
