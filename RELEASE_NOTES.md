# Release Notes

## v0.6.2

### Bug fixes & error handling improvements

- Fixed `renewable_electricity` primary energy carrier being keyed as `electricity_renewable` in `primaryEnergyCarrierEfficiencyFactor`, `co2Factor`, and `primaryEnergyCarrierData` — lookups for this carrier were silently failing
- Engine now wraps each resolver call in a try/catch and rethrows with the resolver name included in the error message (e.g. `Resolver "primaryEnergyDemand" failed: …`)
- `resolveKeyedValue` now throws a descriptive error when a key is not found, listing the available keys instead of crashing with `Cannot read properties of undefined`
