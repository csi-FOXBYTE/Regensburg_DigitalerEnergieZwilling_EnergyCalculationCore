# Release notes draft — v0.11.0

> **Note:** Calculator changes (user input overrides, base rate fixes) written by separate instance — merge below.

---

## Zod validation layer

**Zod is now a peer dependency** (`^3.24.0`). Add it to your project if not already present.

### Schema-first types

All type files have been converted to Zod schema-first. Every type is still exported under its original name — no import changes required in existing code. Each type now also exports a companion Zod schema:

- `DETConfigSchema` / `DETInputSchema` — top-level schemas for config and input
- All section schemas (`DETGeneralConfigSchema`, `DETHeatConfigSchema`, `DETRoofConfigSchema`, `DETTopFloorConfigSchema`, `DETOuterWallConfigSchema`, `DETBottomFloorConfigSchema`, `DETWindowsConfigSchema`, `DETRenovationConfigSchema`, and all input equivalents)
- Base schemas: `BuildingTypeSchema`, `HeatFlowDirectionSchema`, `RoofInsulationTypeSchema`, `SelectionSchema`, `RangesSchema`, `RangeKeySchema`, `EnergyEfficiencyClassSchema`

Both `DETConfigSchema` and `DETInputSchema` are exported from the main entry point for consumers who want to compose their own pipelines.

### `validateConfig` and `validateInput`

```ts
import { validateConfig, validateInput, ValidationResult, ValidationIssue } from "@csi-foxbyte/...";

const cfgResult = validateConfig(rawConfig);
if (!cfgResult.success) {
  // cfgResult.issues: Array<{ path: string; message: string }>
}

const inputResult = validateInput(rawInput, cfgResult.data);
```

Both functions return a discriminated union `{ success: true; data: T } | { success: false; issues: ValidationIssue[] }`.

Validation is two-phase. Phase 2 only runs when phase 1 passes.

**`validateConfig` — phase 1:** Zod shape check (types, required fields, enum values, range band structure).

**`validateConfig` — phase 2, self-consistency:**
- Every carrier has an entry in `primaryEnergyCarrierData`, `defaultHeatingSystemType`
- Every heating system type has entries in `heatingPerformanceFactor`, `temperatureControlPerformanceFactor`, `electricalRatio`, `hasInternalGains`
- All default values (`defaultPrimaryEnergyCarrier`, `defaultHeatingSurfaceType`, `defaultElectricityType`, section-level `defaultConstructionType`/`defaultWindowType`/`defaultTopFloorType`) reference valid catalogue entries
- All `uValue` table keys reference valid catalogue entries
- `allowedHeatingSystemTypesByCarrier` keys and values are valid
- All renovation targets reference valid carriers, system types, and surface types
- **Year-band coverage:** every `yearBands` table must be able to resolve every key in `general.generalYearBands` — catches boundary mismatches between the canonical year bands and lookup tables

**`validateInput` — phase 2, cross-validation against config:**
`heat.primaryEnergyCarrier`, `heat.heatingSystemType` (including allowed-for-carrier constraint via `allowedHeatingSystemTypesByCarrier`), `heat.heatingSurfaceType`, `electricity.electricityType`, `roof.constructionType`, `topFloor.topFloorType`, `outerWall.constructionType`, `bottomFloor.constructionType`, `exteriorWallWindows.windowType`, `roofWindows.windowType`, `preRenovationValues.primaryEnergyCarrier`, `preRenovationValues.heatingSystemType`. All checks are skipped when the field is `null` or `undefined`.

---

## Calculator changes

### Breaking: `userThermalConsumption` removed from input

`DETHeatInput.userThermalConsumption` no longer exists. Physical fuel consumption is now always derived from the billing inputs. Callers that previously provided `userThermalConsumption` directly must migrate to the three billing fields described below.

---

### Thermal billing inputs

Users can now describe their thermal energy bill directly. Three new fields on `DETHeatInput`:

| Field | Type | Description |
|---|---|---|
| `userThermalTotalCost` | `number \| null` | Total annual thermal bill (€/year) |
| `userThermalBaseRate` | `number \| null` | Fixed standing / transport charge (€/year) |
| `userThermalUnitRate` | `number \| null` | Per-unit price (€/unit, e.g. €/l for oil) — existed before, unchanged |

When `userThermalTotalCost` is provided, fuel consumption is derived as:

```
consumption = (totalCost − baseRate) / unitRate
```

`baseRate` and `unitRate` fall back to the values in `primaryEnergyCarrierData` when not provided. If `unitRate` resolves to `0` (base-only carrier), consumption cannot be derived and the physics-calculated path is used instead.

The derived consumption feeds the same energy demand chain as the old direct `userThermalConsumption` did, including renovation scaling via `renovationFactor`. The billing inputs represent the **pre-renovation** state.

**Resolver keys added:** `userThermalConsumption` (derived), `thermalBaseRate`

---

### Thermal and electricity base rates are now user-overridable

Previously both `thermalCarrierCost` and `electricityCost` read the base rate directly from config, making it impossible for users to reflect their actual standing charge.

- `thermalCarrierCost` now uses the `thermalBaseRate` resolver — user override via `userThermalBaseRate`, falling back to `primaryEnergyCarrierData.baseRate`
- `electricityCost` now uses the `electricityBaseRate` resolver — user override via `userElectricityBaseRate` (new field on `DETElectricityInput`), falling back to `electricityTypeData.baseRate`

Both overrides are ignored when a renovation bundle is present and involves a carrier switch (`thermalBaseRate` only — electricity has no carrier-switch concept).

**Resolver keys added:** `thermalBaseRate`, `electricityBaseRate`

---

### No-bill path unchanged

Callers that provide neither billing inputs nor a direct consumption value continue to use the fully physics-calculated path without any changes.
