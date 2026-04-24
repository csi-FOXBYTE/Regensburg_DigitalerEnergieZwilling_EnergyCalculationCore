# Release Notes

## v0.6.1

### Renovation identifiers

- Added `id: string` to the `Renovation` type
- `generateHeatingRenovations` now sets `id` to `heat_renew` for the optional system-renewal entry, and `heat_{carrier}_{system}` for carrier-switching renovations (e.g. `heat_natural_gas_improved_condensing_boiler_55_45`)
- `generateInsulationRenovations` now sets `id` to `envelope_{key}` (e.g. `envelope_roof`, `envelope_outerWalls`)
- `generateHeatingSurfaceRenovations` now sets `id` to `surface_{targetSurfaceType}` (e.g. `surface_radiant_surface_heating`)
