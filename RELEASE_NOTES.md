# Release Notes

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
