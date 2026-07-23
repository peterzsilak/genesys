import type winston from "winston";

import type { UserDto } from "@/api/users/dto/user.dto";
import type { UsersRestClient } from "@/api/users/users-rest-client";
import type { LoggerFactoryService } from "@/services/logger-factory.service";

export interface UserContact {
    readonly name: string;
    readonly email: string;
}

export class UsersService {
    private readonly logger: winston.Logger;

    constructor(
        private readonly usersRestClient: UsersRestClient,
        loggerFactory: LoggerFactoryService,
    ) {
        this.logger = loggerFactory.createLogger(UsersService.name);
    }

    async getUserContacts(): Promise<UserContact[]> {
        const users = await this.usersRestClient.getUsers();
        return users.map((user) => this.toContact(user));
    }

    logContacts(contacts: readonly UserContact[]): void {
        for (const contact of contacts) {
            this.logger.info(`${contact.name} | ${contact.email}`);
        }
    }

    private toContact(user: UserDto): UserContact {
        return { name: user.name, email: user.email };
    }
}
