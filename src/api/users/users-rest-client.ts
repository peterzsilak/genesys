import type { APIRequestContext } from "@playwright/test";

import type { LoggerFactoryService } from "../../services/logger-factory.service";
import { GenericApiClient } from "../generic-api-client/generic-api-client";
import type { GenericApiClientConfig } from "../generic-api-client/generic-api-client-config";
import type { UserDto } from "./dto/user.dto";
import { usersRestClientConfig } from "./users-rest-client.config";

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
