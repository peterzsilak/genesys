import { testTags } from "@/config/test-tags";
import { expect, test } from "@/fixtures/api.fixture";

test.describe("Case 5 - REST API testing", () => {
    test(
        "returns users and the first user email is well formed",
        { tag: [testTags.regression, testTags.desktop] },
        async ({ usersService }) => {
            const contacts = await usersService.getUserContacts();
            usersService.logContacts(contacts);

            expect(
                contacts.length,
                "Users endpoint should return at least one user",
            ).toBeGreaterThan(0);

            const firstContact = contacts[0];
            expect(
                firstContact,
                "First user contact should be present",
            ).toBeDefined();
            expect(
                firstContact?.email,
                "First user email should contain the @ symbol",
            ).toContain("@");
        },
    );
});
