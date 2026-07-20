import type { Locator } from "@playwright/test";

export interface FilterOptions {
    readonly has?: Locator;
    readonly hasNot?: Locator;
    readonly hasText?: string | RegExp;
    readonly hasNotText?: string | RegExp;
}

export class ElementContainer<T extends ElementContainer<T>> {
    readonly root: Locator;

    constructor(root: Locator) {
        this.root = root;
    }

    first(): T {
        return new (this.constructor as new (root: Locator) => T)(
            this.root.first(),
        );
    }

    filter(options: FilterOptions): T {
        return new (this.constructor as new (root: Locator) => T)(
            this.root.filter(options),
        );
    }

    async all(): Promise<T[]> {
        const allRoots = await this.root.all();
        return allRoots.map(
            (currentRoot) =>
                new (this.constructor as new (root: Locator) => T)(currentRoot),
        );
    }
}
