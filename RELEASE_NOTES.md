# Release Notes

## v0.7.2

### Internal gains (interne Gewinne)

- Added `hasInternalGains` flag to config, keyed by heating system type — true for all heat pump variants and `gas_heat_pump_hybrid`
- Added `internalGainsFactorByBuildingType` to heat config: `0.65` for single-family, `0.5` for multi-family
- New resolver `internalGainsFactor` resolves to the building-type factor when `hasInternalGains` is true, otherwise `1`
- New resolver `effectiveHeatingDemand` = `totalEnergyDemand × internalGainsFactor` — the energy the system actually needs to deliver
- Thermal/electrical split now operates on `effectiveHeatingDemand` instead of `totalEnergyDemand`
- Back-calculation (`userTotalEnergyDemand`) now also divides by `preRenovationInternalGainsFactor` to correctly invert the gains reduction
- `CalculationResult` gains `hadInternalGains: boolean`

### Energy efficiency class basis

- `totalEnergyConsumption` added as an explicit resolver: `thermalEnergyDemand + electricalEnergyDemand` (includes electricity offset)
- `totalEnergyDemandPerSquareMeter` now based on `totalEnergyConsumption` instead of raw `totalEnergyDemand`
- `energyEfficiencyClass` now derived from `totalEnergyDemandPerSquareMeter` instead of `primaryEnergyDemandPerSquareMeter`
- `primaryEnergyDemandPerSquareMeter` removed from the calculator

### Pre-renovation values

- All pre-renovation fields removed from `DETHeatInput` and `DETElectricityInput` and consolidated into a single `PreRenovationValues` type
- `DETInput` gains `preRenovationValues?: PreRenovationValues | null` — replaces the scattered `preRenovation*` fields
- `PreRenovationValues` contains `totalEnergyDemand`, `primaryEnergyCarrier`, `heatingSystemType`, `electricityOffset`, and `hadInternalGains`
- `CalculationResult` now returns `preRenovationValues: PreRenovationValues` — populated from current resolved state on the first run, passed through unchanged on subsequent renovation runs
- Supports multi-step renovation chains: the original baseline is preserved across any number of steps

### Renovation

- `generateHeatingSurfaceRenovations` now accepts `input` and filters out surface types already present — can return an empty array
- Insulation renovation patches now include `year: lastYearBand` for each component

## v0.7.0

### Thermal / electrical demand split

- Total energy demand is now split into a thermal side and an electrical side via `electricalRatio` (keyed by heating system type)
- `thermalEnergyDemand` = `totalEnergyDemand × (1 − electricalRatio)`
- `electricalEnergyDemand` = `totalEnergyDemand × electricalRatio + electricityOffset`
- `calculatedElectricalEnergyDemand` is the model projection without offset (used for offset calibration)
- CO₂, cost, and primary energy are now computed separately for the thermal and electrical sides and summed into `totalCo2Emissions`, `totalCost`, and `totalPrimaryEnergyDemand`

### Electricity type catalogue

- `hasRenewableEnergy` replaced by `electricityType` (e.g. `grid`, `renewable`)
- Each electricity type carries its own `co2Factor`, `unitRate`, `baseRate`, and `primaryEnergyFactor`
- `DETElectricityInput` gains `electricityType`, `electricityUnitRate`, and `userElectricityConsumption`
- `ElectricityTypeData` type exported from the package

### None carrier for purely electrical systems

- `electricity` and `renewable_electricity` carriers removed; replaced by a single `none` carrier with all-zero thermal factors
- Heat pumps and electric direct heaters are now grouped under `none` as their primary energy carrier — the thermal side of their demand is zero by definition

### New heating system type

- Added `gas_heat_pump_hybrid` with `electricalRatio: 0.65` and `heatingPerformanceFactor: 0.62`

### Pre-renovation calibration & electricity offset

- `userThermalConsumption` and `userThermalUnitRate` added to `DETHeatInput` for bill-based calibration
- When a thermal bill is provided, `totalEnergyDemand` is back-calculated and scaled by `renovationFactor` on subsequent renovation runs
- `electricityOffset` captures the difference between the user's actual electricity bill and the model's heating electricity projection
- Pre-renovation bundle (`preRenovationTotalEnergyDemand`, `preRenovationPrimaryEnergyCarrier`, `preRenovationHeatingSystemType`, `preRenovationElectricityOffset`) allows the frontend to persist calibration across renovation scenarios

### Renovation improvements

- Insulation renovation patches now include `year: lastYearBand` for each component, matching the behaviour of heating renovations
- `generateHeatingSurfaceRenovations` now accepts `input` and filters out surface types already present in the current state — the function can return an empty array

## v0.6.2

### Bug fixes & error handling improvements

- Fixed `renewable_electricity` primary energy carrier being keyed as `electricity_renewable` in `primaryEnergyCarrierEfficiencyFactor`, `co2Factor`, and `primaryEnergyCarrierData` — lookups for this carrier were silently failing
- Engine now wraps each resolver call in a try/catch and rethrows with the resolver name included in the error message (e.g. `Resolver "primaryEnergyDemand" failed: …`)
- `resolveKeyedValue` now throws a descriptive error when a key is not found, listing the available keys instead of crashing with `Cannot read properties of undefined`
