# Genesys

Playwright + TypeScript test project with strict quality gates.

## Technical Stack

- **Language:** TypeScript
- **Test framework:** Playwright (`@playwright/test`)
- **Linting:** Biome + ESLint (`eslint-plugin-playwright`)
- **Type checking:** TypeScript compiler (`tsc --noEmit`)
- **Git hooks / pre-commit:** Husky + lint-staged
- **Runtime / package manager:** Node.js + npm
- **Node version management:** nvm (`.nvmrc`)

## Project Init

1. Install and activate the project Node.js version with nvm:
   ```bash
   nvm install
   nvm use
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
4. Run the full local quality gate:
   ```bash
   npm run check:all
   ```

## Quality Assurance (QA) setup

Automatic code quality checks are mandatory in this project:

1. **Biome + ESLint hybrid linting**  
   Biome was introduced because `@typescript-eslint` (v8.x) is incompatible with
   TypeScript 7, causing a runtime crash when ESLint tries to parse `.ts` files.
   Instead of downgrading TypeScript or waiting for upstream support, the tooling
   is split by responsibility: Biome (Rust-based, TS-version-agnostic) handles
   fast lint, format, and autofix for all source files; ESLint is scoped only to
   `src/tests/` and `playwright.config.ts` where `eslint-plugin-playwright`
   provides Playwright-specific rules that Biome cannot replicate.
2. **TypeScript typecheck (`tsc --noEmit`)**  
   Mandatory type checking without emitting build output.
3. **Pre-commit hook (Husky + lint-staged)**  
   Runs lint on staged files and then the full typecheck before commit.

This prevents broken or low-quality code from being committed to the repository.

## Available scripts

- `npm run lint` – run Biome + ESLint checks
- `npm run lint:fix` – auto-fix issues where possible
- `npm run lint:biome` – run Biome checks
- `npm run lint:eslint` – run ESLint checks on tests/config
- `npm run format` – format files with Biome
- `npm run typecheck` – run TypeScript type checking
- `npm run check` – run lint + typecheck
- `npm run check:all` – run full local gate chain (check + tests)
- `npm run precommit` – run the pre-commit pipeline manually
- `npm run test` – run Playwright tests
- `npm run test:raw` – run Playwright tests without the `pretest` hook
- `npm run test:headed` – run tests in headed mode
- `npm run test:ui` – run tests in Playwright UI mode
- `npm run ci` – run CI-equivalent local pipeline

## Allowed and discouraged practices

### Allowed / expected

- Consistent use of `async/await`
- Web-first Playwright assertions
- Type-safe TypeScript code (strict mode)
- Continuous lint and typecheck execution

### Discouraged

- `test.only` (forbidden)
- Conditional logic in test bodies (`if`-based branching in test flow)
- `waitForTimeout`-based waiting
- Loose typing and ignored lint errors
