import { faker } from "@faker-js/faker";

import type { CheckoutInfo } from "@/test-data/checkout-info";

export class CheckoutInfoBuilder {
    private info: CheckoutInfo;

    constructor() {
        this.info = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode(),
        };
    }

    withFirstName(firstName: string): this {
        this.info = { ...this.info, firstName };
        return this;
    }

    withLastName(lastName: string): this {
        this.info = { ...this.info, lastName };
        return this;
    }

    withPostalCode(postalCode: string): this {
        this.info = { ...this.info, postalCode };
        return this;
    }

    build(): CheckoutInfo {
        return { ...this.info };
    }
}

export function aCheckoutInfo(): CheckoutInfoBuilder {
    return new CheckoutInfoBuilder();
}
