import type { APIRequestContext } from "@playwright/test";

import { GenericApiClient } from "@/api/generic-api-client/generic-api-client";
import type { GenericApiClientConfig } from "@/api/generic-api-client/generic-api-client-config";
import type { UserDto } from "@/api/users/dto/user.dto";
import { usersRestClientConfig } from "@/api/users/users-rest-client.config";
import type { LoggerFactoryService } from "@/services/logger-factory.service";

export class UsersRestClient extends GenericApiClient {
    private static readonly USERS_PATH = "/users";

    constructor(
        request: APIRequestContext,
        loggerFactory: LoggerFactoryService,
        config: GenericApiClientConfig = usersRestClientConfig,
    ) {
        super(request, loggerFactory, config);
    }

    async getUsers(): Promise<UserDto[]> {
        return this.get<UserDto[]>(UsersRestClient.USERS_PATH);
    }
}
