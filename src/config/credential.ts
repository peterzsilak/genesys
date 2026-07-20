export const acceptedUsernames = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user",
] as const;

export type AcceptedUsername = (typeof acceptedUsernames)[number];

export interface Credential {
    readonly username: AcceptedUsername;
    readonly password: string;
}

export interface CredentialRegistry {
    readonly usernames: readonly AcceptedUsername[];
    readonly password: string;
}
