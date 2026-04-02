# Regensburg Digital Twin - EnergyCalculationCore

TypeScript library providing core types and utilities for building energy calculation in the Regensburg Digital Energy Twin project.

## Installation

```bash
pnpm add @csi-foxbyte/regensburg_digitalerenergiezwilling_energycalculationcore
```

Requires an `.npmrc` pointing to GitHub Packages:

```
@csi-foxbyte:registry=https://npm.pkg.github.com
```

## Exports

**Types:**
- `DETConfig`, `DETGeneralConfig` — configuration schema
- `DETInput`, `DETGeneralInput`, `DETHeatInput` — calculation input schema
- `BuildingType` — enum for single/multi-family buildings
- `KeyedValues`, `RangeBands`, `YearBands`, `Ranges`, `RangeKey` — generic data structures

**Utility functions:**
- `resolveKeyedValue` — look up a value by key
- `resolveRangeBand` / `resolveYearBand` — resolve a value from range-based bands

## Development

```bash
pnpm install
pnpm run lint       # type-check
pnpm run test       # run tests
pnpm run build      # lint + test + bundle
pnpm run docs       # generate API docs + configurator
```

## Project Structure

```text
src/
  types/         # shared types, config and input schemas
  engine/        # resolver-based calculation engine
  calculators/   # domain-specific calculators (cuboid, energy)
```

## Publishing

Publishing is automated via GitHub Actions. Create a GitHub release and the package is published to GitHub Packages automatically.
