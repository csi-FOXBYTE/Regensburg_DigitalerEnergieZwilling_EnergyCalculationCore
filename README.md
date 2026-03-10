# Regensburg Digital Twin - EnergyCalculationCore

TypeScript calculation core for building energy indicators and renovation recommendations.

The project is split into clear domains (`catalogs`, `envelope`, `heating`, `core`) and uses external JSON-based configuration.  
Calculation logic is fixed in code. Only parameters, lookup values, and recommendation rules are configurable.

## Features

- Domain-based architecture:
  - `catalogs`: U-value lookup resolution
  - `envelope`: envelope and HT calculations
  - `energy`: annual demand indicators such as `HV`, `QH`, end energy, primary energy, fuel use, cost, and CO2
  - `heating`: heating-system evaluation
  - `core`: orchestration and aggregation
- External configuration via JSON object
- Explicit year-band catalogs in JSON
- Optional explicit envelope-area overrides (`envelopeArea`, `aggregateReferenceAreaOverride`)
- Component-specific defaults such as roof-window correction factors
- Conditional recommendation rules for LOD2/LOD3 metadata
- Annual energy indicators based on the workbook formulas (`HV`, `QH`, final energy, primary energy, cost, CO2)
- Unit tests per domain plus integration tests

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm run lint
pnpm run test
pnpm run build
pnpm run docs:api
pnpm run configurator:build
```

## API Documentation

- Generated API docs: [docs/api/README.md](docs/api/README.md)
- Regenerate docs: `pnpm run docs:api`

## Configurator

- Standalone configurator output: [docs/configurator.html](docs/configurator.html)
- Generated JSON Schema: [docs/core-config.schema.json](docs/core-config.schema.json)
- Build it from the TypeScript config types: `pnpm run configurator:build`
- Full docs + configurator: `pnpm run docs`

## Usage

```ts
import {
  calculateCore,
  coreConfigFromJson,
  defaultCoreConfigJson,
} from "@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore";

const config = coreConfigFromJson(defaultCoreConfigJson);

const result = calculateCore(
  {
    roofWindow: {
      roof: { catalog: "category1", construction: "roof_massive", year: 1985, area: 100 },
      roofWindow: { catalog: "category1", construction: "window_pvc_iso", year: 1985, area: 20 },
      envelopeArea: 150,
    },
    wallWindow: {
      wall: { uValue: 0.5, area: 80 },
      window: { uValue: 1.5, area: 20 },
    },
    aggregateReferenceAreaOverride: 500,
    heating: {
      mode: "central",
      primaryCarrier: "gas",
      primaryType: "standard_boiler_gas",
      yearOfConstruction: 2010,
    },
    energy: {
      degreeDaysKdPerA: 3000,
      heatedAirVolumeM3: 500,
      airChangeRate: 0.5,
      peopleCount: 4,
      solarGainEntries: [{ area: 10, irradiationKWhPerM2A: 100, energyTransmittance: 0.5 }],
    },
  },
  config,
);

console.log(result.aggregate);
console.log(result.energy);
```

## Configuration (JSON)

Entry point:

- `coreConfigFromJson(jsonConfig) -> CoreConfig`

JSON structure:

- `envelope.defaultFactor`: default correction factor `F`
- `envelope.defaultDeltaUwb`: default thermal-bridge surcharge
- `envelope.componentDefaults`: optional per-component defaults, e.g. `roofWindow.factor`
- `envelope.catalogs`:
  - `catalogName -> constructionName -> { from?, to?, value }[]`
- `envelope.recommendations`: age-based rules per component
- `SurfaceInput.details`: optional LOD2/LOD3 metadata for recommendation rules
- `heating.details`: optional LOD2/LOD3 metadata for recommendation rules
- `heating.rules`: optional conditional recommendation rules evaluated before legacy thresholds
- `energy`: workbook-based defaults for `HV`, `QH`, warm water, final energy, primary energy, fuel profiles, cost, and CO2
- TypeScript keeps concrete `catalog` and `construction` keys when the config is passed as a literal or with `satisfies CoreConfigJson`

Example with explicit year bands:

```ts
const jsonConfig = {
  envelope: {
    defaultFactor: 1,
    defaultDeltaUwb: 0.1,
    componentDefaults: {
      roofWindow: { factor: 0.93 },
    },
    catalogs: {
      custom: {
        wall: [
          { to: 1900, value: 1.8 },
          { from: 1901, to: 1950, value: 1.2 },
          { from: 1951, to: 2000, value: 0.8 },
          { from: 2001, value: 0.35 },
        ],
      },
    },
    recommendations: {
      roof: [
        {
          minAge: 40,
          conditions: [{ field: "details.insulationPresent", equals: false }],
          action: "full_renovation",
          reason: "Old roof without insulation.",
          targetUValue: 0.14,
        },
      ],
      roofWindow: [],
      wall: [],
      wallWindow: [],
      topFloorCeiling: [],
      lowestFloor: [],
    },
  },
  heating: {
    referenceYear: 2026,
    optimizeAfterYears: 15,
    replaceAfterYears: 25,
    noActionTypes: [],
    directReplaceTypes: [],
    rules: [
      {
        conditions: [{ field: "details.districtHeatingAvailable", equals: true }],
        action: "replace",
        reason: "District heating can be connected.",
        preferredReplacement: "district_heating",
      },
    ],
    replacementByCarrier: {
      oil: "air_water_heat_pump",
      gas: "air_water_heat_pump",
      biomass: "pellet_boiler",
      electricity: "air_water_heat_pump",
      district_heating: "district_heating",
      other: "air_water_heat_pump",
    },
  },
  energy: {
    usableAreaFactorFromVolume: 0.32,
    internalGainWattsPerM2: 5,
    heatingPeriodDays: 185,
    degreeDayFactorMultiplier: 0.024,
    ventilationCoefficient: 0.34,
    defaultSolarGainUtilizationFactor: 1,
    domesticHotWaterDemandPerPersonKWhPerYear: 500,
    occupancyAreaPerPersonM2: 40,
    defaultFinalEnergyFactor: 1,
    defaultControlFactor: 1.095,
    generationFactorByHeatingType: {
      standard_boiler_gas: [{ from: 1995, value: 1.4 }],
    },
    controlFactorByType: {
      room_temperature_control: 1.095,
    },
    emitterFactorAdjustmentByType: {
      radiator: 0,
    },
    flowTemperatureAdjustmentBands: [{ from: 80, value: 0.036 }],
    radiatorPositionAdjustmentByType: {
      exterior_wall: 0.009,
    },
    intermittentAdjustmentByEmitterType: {
      radiator: -0.018,
    },
    singleRoomControlAdjustmentByType: {
      independent: -0.03,
    },
    primaryEnergyFactorByCarrier: {
      oil: 1.1,
      gas: 1.1,
      biomass: 0.2,
      electricity: 1.8,
      district_heating: 0.7,
      other: 1,
    },
    fuelCarrierProfileByCarrier: {
      gas: {
        unit: "m3",
        unitsPerKWh: 0.1,
        pricePerUnit: 1.2,
        co2KgPerUnit: 2.02,
      },
    },
  },
} satisfies CoreConfigJson;
```

If you want compact authoring in TypeScript, you can still build explicit year bands with `yearBandsFromLayout(...)` before passing the config into `coreConfigFromJson(...)`.

## Project Structure

```text
src/
  catalogs/
  envelope/
  heating/
  core/
  shared/
  config/
test/
  domain/
  integration/
  config/
```

## Testing

Tests cover:

- catalog mapping and error cases
- envelope calculations including area overrides
- energy calculations for workbook formulas and factor overrides
- heating rule paths
- end-to-end integration through `calculateCore`
