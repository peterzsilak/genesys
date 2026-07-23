import fs from "node:fs";
import path from "node:path";

import {
    type AcceptedUsername,
    type Credential,
    type CredentialRegistry,
    acceptedUsernames,
} from "@/config/credential";

const credentialPath = path.resolve(
    process.cwd(),
    "test/resources/credential.json",
);

const validUsernames = new Set<string>(acceptedUsernames);

const isAcceptedUsername = (value: string): value is AcceptedUsername =>
    validUsernames.has(value);

function assertIsCredentialRegistry(
    value: unknown,
): asserts value is CredentialRegistry {
    if (typeof value !== "object" || value === null) {
        throw new Error("Credential registry must be a JSON object.");
    }

    const usernames = Reflect.get(value, "usernames");
    const password = Reflect.get(value, "password");

    if (
        !Array.isArray(usernames) ||
        !usernames.every((item) => typeof item === "string")
    ) {
        throw new Error(
            "Credential registry must contain a string array at `usernames`.",
        );
    }

    if (typeof password !== "string" || password.length === 0) {
        throw new Error(
            "Credential registry must contain a non-empty `password` string.",
        );
    }

    const unknownUsers = usernames.filter(
        (username) => !isAcceptedUsername(username),
    );
    if (unknownUsers.length > 0) {
        throw new Error(
            `Credential registry contains unsupported usernames: ${unknownUsers.join(", ")}`,
        );
    }
}

export const loadCredentialRegistry = (): CredentialRegistry => {
    const raw = fs.readFileSync(credentialPath, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    assertIsCredentialRegistry(parsed);
    return parsed;
};

export const getCredentialByUsername = (username: string): Credential => {
    const registry = loadCredentialRegistry();
    if (!isAcceptedUsername(username)) {
        throw new Error(`Unsupported username: ${username}`);
    }
    if (!registry.usernames.includes(username)) {
        throw new Error(
            `Username ${username} is missing from credential registry.`,
        );
    }
    return {
        username,
        password: registry.password,
    };
};
