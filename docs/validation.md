# Validation — Handoff

## What is done

Zod added as `peerDependency` (`^3.24.0`), also in `devDependencies` for local use.

All type files replaced with Zod schema-first equivalents. Every type is still exported
under its original name — no import changes required anywhere in the codebase.

### Base schemas (`src/types/`)

| File | Exports |
|---|---|
| `building-type.ts` | `BuildingType` const, `BuildingTypeSchema`, `type BuildingType` |
| `heat-flow-direction.ts` | `HeatFlowDirection` const, `HeatFlowDirectionSchema`, `type HeatFlowDirection` |
| `roof-insulation-type.ts` | `RoofInsulationType` const, `RoofInsulationTypeSchema`, `type RoofInsulationType` |
| `energy-efficiency-class.ts` | `EnergyEfficiencyClassSchema`, `type EnergyEfficiencyClass` |
| `selection.ts` | `SelectionSchema`, `selectionFilter` factory, `type Selection`, `type SelectionFilter<K,V>` |
| `keyed-values.ts` | `keyedValues` factory, `type KeyedValues<K,T>`, `resolveKeyedValue` |
| `range-bands.ts` | `rangeBands`/`yearBands` factories, `RangesSchema`, `RangeKeySchema`, all original types and runtime helpers |

**Key design decisions:**
- Enums converted from TypeScript `enum` to `const` object + `z.nativeEnum()`. Values unchanged — `BuildingType.SINGLE_FAMILY` etc. all still work.
- `RangeKey` derives from `RangeKeySchema` (required for `exactOptionalPropertyTypes: true` compat — Zod's `.optional()` infers `T | undefined`, the hand-written type would have been incompatible).
- `rangeBands` uses option B: `superRefine` for positional validation + `.transform(data => data as RangeBands<T>)` to preserve the precise tuple type in inference.
- `SelectionFilter<K,V>` kept as a hand-written generic type alongside the `selectionFilter` factory (generic defaults can't be expressed in the factory signature cleanly).

### Config schemas (`src/types/config/`)

All config section schemas follow the same structure: `DET*ConfigSchema` + `type DET*Config = z.infer<...>`.

- `general.ts` — `DETGeneralConfigSchema`
- `heat.ts` — `DETHeatConfigSchema`, `PrimaryEnergyCarrierDataSchema`, `ElectricityTypeDataSchema`, `CarrierSelectionSchema`, `CarrierRequirementsSchema`. `isCarrierCompatible` function preserved.
- `roof.ts`, `topFloor.ts`, `outerWall.ts`, `bottomFloor.ts`, `windows.ts` — straightforward.
- `index.ts` — `DETConfigSchema`, `type DETConfig`
- `src/types/renovation/renovation.ts` — `DETRenovationConfigSchema` + all sub-schemas. `InputPatch` and `Renovation` kept as hand-written types (internal renovation system, not part of the validation API).

### Input schemas (`src/types/input/`)

All follow the same structure: `DET*InputSchema` + `type DET*Input = z.infer<...>`.

- `general.ts`, `heat.ts`, `electricity.ts`, `preRenovation.ts`
- `roof.ts`, `topFloor.ts`, `outerWall.ts`, `bottomFloor.ts`, `exteriorWallWindows.ts`, `roofWindows.ts`
- `index.ts` — `DETInputSchema`, `type DETInput`

---

## What is left — the validators

Two exported functions to implement, plus their supporting consistency checkers.

### Return type (shared)

Both functions use safeParse semantics. Use a unified result type:

```ts
export type ValidationIssue = { path: string; message: string };

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; issues: ValidationIssue[] };
```

Zod errors get mapped to `ValidationIssue[]`. Custom consistency errors use the same shape.
This gives consumers a single error handling story regardless of which check failed.

---

### 1. `validateConfig(data: unknown): ValidationResult<DETConfig>`

**File:** `src/validators/config.ts`

Step 1 — shape: `DETConfigSchema.safeParse(data)`. On failure, map `ZodError.errors` to `ValidationIssue[]`.

Step 2 — self-consistency (only runs if shape passes). Checks to implement:

| Rule | Path hint |
|---|---|
| Every `primaryEnergyCarriers[i].value` has an entry in `primaryEnergyCarrierData` | `heat.primaryEnergyCarrierData` |
| `defaultPrimaryEnergyCarrier` is in `primaryEnergyCarriers` | `heat.defaultPrimaryEnergyCarrier` |
| Every `heatingSystemTypes[i].value` has entries in `heatingPerformanceFactor`, `temperatureControlPerformanceFactor`, `electricalRatio`, `hasInternalGains` | `heat.heatingPerformanceFactor` etc. |
| Every `primaryEnergyCarriers[i].value` has an entry in `defaultHeatingSystemType` | `heat.defaultHeatingSystemType` |
| `defaultHeatingSurfaceType` is in `heatingSurfaceTypes` | `heat.defaultHeatingSurfaceType` |
| Every `electricityTypes[i].value` has an entry in `electricityTypeData` | `heat.electricityTypeData` |
| `defaultElectricityType` is in `electricityTypes` | `heat.defaultElectricityType` |
| `allowedHeatingSystemTypesByCarrier` keys are valid carrier values | `heat.allowedHeatingSystemTypesByCarrier` |
| `allowedHeatingSystemTypesByCarrier` allowed values are valid system type values | `heat.allowedHeatingSystemTypesByCarrier` |
| `renovation.primaryEnergyCarrierTargets` are all in `primaryEnergyCarriers` | `renovation.primaryEnergyCarrierTargets` |
| `renovation.heatingRenovations[i].targetCarrier` in carriers, `targetSystem` in system types | `renovation.heatingRenovations` |
| `renovation.heatingSurfaceRenovations[i].targetSurfaceType` in surface types | `renovation.heatingSurfaceRenovations` |

---

### 2. `validateInput(data: unknown, config: DETConfig): ValidationResult<DETInput>`

**File:** `src/validators/input.ts`

Step 1 — shape: `DETInputSchema.safeParse(data)`. On failure, map to `ValidationIssue[]`.

Step 2 — cross-validation against config (only runs if shape passes):

| Rule | Path hint |
|---|---|
| `heat.primaryEnergyCarrier` if provided → in `config.heat.primaryEnergyCarriers[].value` | `heat.primaryEnergyCarrier` |
| `heat.heatingSystemType` if provided → in `config.heat.heatingSystemTypes[].value` | `heat.heatingSystemType` |
| `heat.heatingSystemType` + `heat.primaryEnergyCarrier` → system allowed for carrier via `allowedHeatingSystemTypesByCarrier` | `heat.heatingSystemType` |
| `heat.heatingSurfaceType` if provided → in `config.heat.heatingSurfaceTypes[].value` | `heat.heatingSurfaceType` |
| `electricity.electricityType` if provided → in `config.heat.electricityTypes[].value` | `electricity.electricityType` |
| `preRenovationValues.primaryEnergyCarrier` if provided → in `config.heat.primaryEnergyCarriers[].value` | `preRenovationValues.primaryEnergyCarrier` |
| `preRenovationValues.heatingSystemType` if provided → in `config.heat.heatingSystemTypes[].value` | `preRenovationValues.heatingSystemType` |

---

### 3. Public API surface

**File:** `src/validators/index.ts` — re-exports `validateConfig`, `validateInput`, `ValidationResult`, `ValidationIssue`.

Export both from the library's main `src/index.ts`.

Also export the schemas themselves (`DETConfigSchema`, `DETInputSchema`) for consumers who want to compose their own validation.
