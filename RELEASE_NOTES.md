# Release Notes

## v0.6.0

### Renovation system

- Added `Renovation` type with a `label` (resolved outside the library) and an `InputPatch`
- Added `applyRenovation(input, renovation | renovation[])` to apply one or more renovations to a `DETInput`
- Added `generateHeatingRenovations(config, input, locale, systemRenewalLabel?)` — returns compatible carrier renovations filtered by the current input; optional `systemRenewalLabel` adds a system-renewal entry that bumps the construction year to the latest year band
- Added `generateInsulationRenovations(config, translate)` — generates one renovation per insulation component using target U-values from config
- Added `generateHeatingSurfaceRenovations(config, locale)` — generates heating surface renovations from config
- Default config now includes pre-configured heating renovations: air source heat pump, ground source heat pump (both for grid and renewable electricity), natural gas, biogas, wood pellets, and district heating; and a surface renovation for radiant surface heating

### Carrier requirements & compatibility

- Added `CarrierRequirements` type `{ renewableElectricity?, storage?, gas?, bioGas? }` to conditionally gate carrier availability
- Added `CarrierSelection` extending `Selection` with an optional `requirements` field
- Added `isCarrierCompatible(carrier, input)` — returns `false` if any defined requirement does not match the corresponding input flag
- Default config carrier requirements:
  - `heating_oil_heavy`, `heating_oil_light`, `wood_biomass`, `wood_pellets` → `storage: true`
  - `natural_gas` → `gas: true, bioGas: false`
  - `bio_gas` → `gas: true, bioGas: true`
  - `electricity` → `renewableElectricity: false`
  - `renewable_electricity` → `renewableElectricity: true`

### New inputs

- `DETElectricityInput` — new top-level input section with `hasRenewableEnergy`
- `DETHeatInput` — added `hasGasSupply`, `hasBioGas`, `hasStorage`
- All envelope components (`roof`, `topFloor`, `outerWall`, `bottomFloor`) — added `uValue` direct override; when provided the U-value resolver skips the full thermal resistance calculation

### Insulation renovation config

- Added `InsulationRenovationConfig`, `InsulationRenovationConfigs`, `InsulationRenovationKeys`, and `insulationKeys` constant
- Default config includes target U-values for all insulation components: roof `0.14`, top floor `0.14`, outer walls `0.2`, bottom floor `0.25`, exterior windows `0.95`, roof windows `1.0`

### Resolved input feedback

- `CalculationResult.resolvedInput` now includes the new `electricity` section and the new heat flags (`hasGasSupply`, `hasBioGas`, `hasStorage`)
