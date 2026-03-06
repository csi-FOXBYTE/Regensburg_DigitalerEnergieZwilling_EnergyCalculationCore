# Regensburg Digital Twin - EnergyCalculationCore

TypeScript calculation core for building energy indicators and renovation recommendations.

The project is split into clear domains (`catalogs`, `envelope`, `heating`, `core`) and uses external JSON-based configuration.  
Calculation logic is fixed in code. Only parameters, lookup values, and recommendation rules are configurable.

## Features

- Domain-based architecture:
  - `catalogs`: U-value lookup resolution
  - `envelope`: envelope and HT calculations
  - `heating`: heating-system evaluation
  - `core`: orchestration and aggregation
- External configuration via JSON object
- Dynamic year-band layouts (not limited to 9 bands)
- Optional explicit envelope-area overrides (`envelopeArea`, `aggregateReferenceAreaOverride`)
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
```

## API Documentation

- Generated API docs: [docs/api/README.md](docs/api/README.md)
- Regenerate docs: `pnpm run docs:api`

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
  },
  config,
);

console.log(result.aggregate);
```

## Configuration (JSON)

Entry point:

- `coreConfigFromJson(jsonConfig) -> CoreConfig`

JSON structure:

- `envelope.defaultFactor`: default correction factor `F`
- `envelope.defaultDeltaUwb`: default thermal-bridge surcharge
- `envelope.yearBandLayout`:
  - Defines the year ranges used for numeric U-value arrays
  - Any length is supported
- `envelope.catalogs`:
  - `catalogName -> constructionName ->` either:
    - numeric array (mapped using `yearBandLayout`)
    - explicit `{ from?, to?, value }[]`
- `envelope.recommendations`: age-based rules per component
- `heating`: heating evaluation rules

Example with dynamic layout:

```ts
const jsonConfig = {
  envelope: {
    defaultFactor: 1,
    defaultDeltaUwb: 0.1,
    yearBandLayout: [
      { to: 1900 },
      { from: 1901, to: 1950 },
      { from: 1951, to: 2000 },
      { from: 2001 },
    ],
    catalogs: {
      custom: {
        wall: [1.8, 1.2, 0.8, 0.35],
      },
    },
    recommendations: {
      roof: [],
      roofWindow: [],
      wall: [],
      wallWindow: [],
      ogd: [],
      ugd: [],
    },
  },
  heating: {
    referenceYear: 2026,
    optimizeAfterYears: 15,
    replaceAfterYears: 25,
    noActionTypes: [],
    directReplaceTypes: [],
    replacementByCarrier: {
      oil: "air_water_heat_pump",
      gas: "air_water_heat_pump",
      biomass: "pellet_boiler",
      electricity: "air_water_heat_pump",
      district_heating: "district_heating",
      other: "air_water_heat_pump",
    },
  },
};
```

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
- heating rule paths
- end-to-end integration through `calculateCore`
