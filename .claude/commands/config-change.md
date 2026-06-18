# Config Change

You help make a config schema change end-to-end: schema, default config, migrator, fixture, and tests.

**Before touching any file, make sure you have clear answers to every item below. If anything is ambiguous or not stated in the request, ask the user. Only ask about things that are genuinely unclear — do not ask about things already specified.**

---

## What you need to know before starting

Go through this list. For each item that is not already clear from the request, ask the user. Gather everything before acting.

**About the change:**
- Which schema is changing? (e.g. `HeatingSurfaceRenovationConfig`, `InsulationRenovationConfig`, or another type under `src/types/`)
- What is the field name and TypeScript type?
- Required or optional in the Zod schema?
- What value should it have in `DEFAULT_CONFIG`? If the value depends on other config data (e.g. filtering by system types present in the config), describe the rule.

**About migration:**
- When the field is missing on an existing config, what should the migrator fill in? Should it derive the value from other fields already in the config, or use a fixed default?
- Is there a fallback for cases where the migrator cannot determine a safe value (e.g. empty array, `null`)?

**About the test fixture:**
- What value should `baseConfig()` in `test/validators/fixtures.ts` use for this field?

**Confirm before proceeding:**
Once everything is clear, summarise the full plan in plain language and ask: "Does this match what you want? I won't touch any files until you confirm."

---

## What to do after confirmation

Work through these steps in order. Complete each one fully before moving to the next.

### 1. Schema
Update the Zod schema in the relevant file under `src/types/`. Required fields have no `.optional()`.

### 2. Default config
Add the field to the matching entry in `src/types/config/default-config.ts`, next to where the rest of that entry is defined.

### 3. Migrator
Open `src/validators/migrate.ts` and:
- Add a new `ConfigMigrator` object with:
  - `id`: a short kebab-case string describing the change
  - `canFix(issue)`: returns true when `issue.path` matches the Zod path for the missing field. For array entries the path contains a numeric index — use a regex like `/^some\.path\.\d+\.fieldName$/`
  - `migrate(raw)`: transforms the raw unknown config. Only fill in the field when it is missing (`== null`). Derive the value according to the agreed rule.
- Add the new migrator to the `migrators` array.

### 4. Test fixture
Add the new field to the relevant entry in `test/validators/fixtures.ts` using the agreed value.

### 5. Existing tests
Search `test/` for any test that constructs a config object containing the changed schema entry without the new field. Add the field to each such occurrence so the Zod parse does not fail before the test's intended assertion runs.

### 6. Migrator tests
Add tests to `test/validators/migrate.test.ts` covering:
- `detectMigrations` returns the new migrator when the issue path matches
- The migrator fills the field correctly for the known case
- The migrator falls back correctly for the unknown/neutral case
- The migrator does not overwrite a field that is already set
- `validateAndMigrate` returns `{ success: true, migrated: true }` for a config missing the field

---

## Key files for reference

- Zod schemas: `src/types/renovation/renovation.ts`, `src/types/config/` for other config types
- Default config: `src/types/config/default-config.ts`
- Migrator + detectMigrations + validateAndMigrate: `src/validators/migrate.ts`
- Test fixture: `test/validators/fixtures.ts`
- Existing migrator tests: `test/validators/migrate.test.ts`
- Existing config validator tests: `test/validators/config.test.ts`
