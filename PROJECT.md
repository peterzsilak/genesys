# PROJECT.md — Project-Specific Profile

This file contains project-dependent values used by instructions and automation conventions.

## Identity

- Project name: `genesys`
- Repository root: `.`
- Test suite working directory: `.`
- Primary stack: `TypeScript + Playwright`

## Paths

> All paths are relative to the repository root.

- Plan file: `tasks/test-plan.md` (optional; create only when needed)
- Tests directory: `src/tests/`
- Page Objects directory: `src/page-objects/`
- Fixtures directory: `src/fixtures/`
- Services directory: `src/services/`
- API clients directory: `src/api/`
- Config directory: `src/config/`
- Test data directory: `src/test-data/`
- Utils directory: `src/utils/`

## Locator/Test ID Source of Truth

- Playwright config: `playwright.config.ts`
- Canonical source of truth: `playwright.config.ts` → `use.testIdAttribute`
- Current configured attribute: Playwright default (`data-testid`) unless explicitly overridden

## Quality and Test Commands

- TypeScript config: `tsconfig.json`
- ESLint config: `eslint.config.mjs`
- Biome config: `biome.json`
- Pre-commit hook: `.husky/pre-commit`
- Typecheck command: `npm run typecheck`
- Lint command: `npm run lint`
- Lint auto-fix command: `npm run lint:fix`
- Quality gates command: `npm run check`
- Full local enforcement command: `npm run check:all`
- Pre-commit pipeline command: `npm run precommit`
- Test command: `npm run test`
- Raw test command (no `pretest`): `npm run test:raw`
- Headed test command: `npm run test:headed`
- UI test command: `npm run test:ui`
- CI-equivalent command: `npm run ci`

## Git / PR Defaults

- Default base branch: `master`
- PR base branch: `master`
- PRs should include passing quality gates and tests.

## Runtime / CI

- Main workflow: `.github/workflows/playwright.yml`
- CI runs static quality gates in a dedicated `quality` job, then Playwright tests.
- Current report artifacts: `playwright-report/`
- Current test result artifacts: `test-results/`

## Quality Rules (Playwright + TypeScript)

### Expected

- Consistent use of `async/await`
- Web-first assertions where applicable
- Strict, type-safe TypeScript
- Deterministic and readable test design

### Avoid

- `test.only`
- `waitForTimeout`-based waiting
- Conditional branching in test bodies
- Ignored lint or type errors

## MCP Servers

Configured in `.mcp.json`. Each server has a unique name that becomes the tool namespace prefix.

| Server name | Package | Tool namespace | Env vars required |
|---|---|---|---|
| `playwright-test` | `@playwright/mcp` | `playwright-test/*` | — |
| `github` | `@modelcontextprotocol/server-github` (npx) | `github/*` | `GITHUB_PERSONAL_ACCESS_TOKEN` |

All servers are stdio-based (no TCP port conflicts). All env vars use platform-unique prefixes
(`GITHUB_`). Set only the env vars for the platforms actively used.

- The `github` server is optional — remove unused entries from `.mcp.json`.
- `playwright-test` is required for planner, generator, and healer agents.

### Loading credentials locally

Copy `.env.template` to `.env` and fill in values. The `.env` file is git-ignored and must never
be committed. The `.mcp.json` `${VAR}` syntax reads from the **process environment**, not from
`.env` directly — export the variables before starting your editor or MCP host:

```bash
# Option A — one-off export before opening VS Code / Cursor
source .env && code .

# Option B — automatic per-directory export with direnv
echo "dotenv" > .envrc && direnv allow

# Option C — shell profile (~/.zshrc or ~/.bashrc); less project-scoped
export $(grep -v '^#' .env | xargs)
```

Keep `GITHUB_TOKEN` and `GITHUB_PERSONAL_ACCESS_TOKEN` set to the same PAT value unless your
workflow requires separate scopes. `GITHUB_TOKEN` is consumed by the `gh` CLI;
`GITHUB_PERSONAL_ACCESS_TOKEN` is consumed by the `github` MCP server.
