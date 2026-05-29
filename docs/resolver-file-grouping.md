# Resolver File Grouping

## Motivation

The current one-file-per-resolver structure is principled but doesn't scale visually — a component like `outerWall` produces 15+ files that are each ~15 lines of near-identical boilerplate.

## Proposed Structure

Group resolvers by logical ownership rather than one file per resolver. Each file is anchored by a central output value that callers actually care about. Supporting intermediates that exist purely to compute that value live in the same file. The `declare module` block at the top becomes a natural table of contents for the logical unit.

### Ownership rules

- **Owner file** — named after the central output (e.g. `outerWallUValue.ts`). Contains all resolvers that exist solely to compute it.
- **Shared dependency file** — a resolver depended on by multiple owners earns its own file (e.g. `outerWallYear.ts`).
- **Inputs file** — thin input passthroughs with no logic can be grouped into a single file (e.g. `outerWallInputs.ts`).

### Example breakdown for `outerWall`

| File | Contains |
|---|---|
| `outerWallInputs.ts` | `outerWallArea`, `adjacentWallArea`, `outerWallHasInsulation`, `outerWallInsulationThickness`, `outerWallUValue` (override passthrough) |
| `outerWallYear.ts` | `outerWallYear` (shared dependency — feeds construction type and insulation chains) |
| `outerWallUValue.ts` | `outerWallConstructionType`, `outerWallConstructionUValue`, `outerWallConstructionResistance`, `outerWallThermalConductivity`, `outerWallInnerSurfaceThermalResistance`, `outerWallOuterSurfaceThermalResistance`, `outerWallInsulationResistance`, `outerWallThermalResistance`, `outerWallUValue` (computed) |
| `outerWallHeatLoss.ts` | `outerWallHeatLossFactor`, `adjacentWallUValue`, `outerWallHeatLoss` |
| `outerWallHeatingDemand.ts` | `outerWallHeatingDemand` |

## Refactoring notes

- Safe to move resolvers freely between files — resolvers reference each other via `ctx.get()` at runtime, not via module imports.
- Only `index.ts` imports need updating when files are reorganized.
- `outerWall` is a good pilot group since the ownership structure is already clear.
