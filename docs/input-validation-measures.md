# Input Validation Measures by Component

The numbers below refer to the corresponding rows in
[`input-validation-contradictions.md`](./input-validation-contradictions.md).

## Frontend

1. **Floors must be positive (#1):** Keep enforcing
   `general.numberOfStories > 0`.
2. **Building base area must be positive (#4):** Keep enforcing
   `general.buildingBaseArea > 0`.
3. **Electricity bill costs must be consistent (#5):** Enforce
   `baseCost <= totalCost` before deriving electricity consumption.
4. **Thermal bill costs must be consistent (#6):** Enforce
   `heat.userThermalBaseRate <= heat.userThermalTotalCost` when both values are
   supplied.
5. **Thermal unit rate must be positive (#7):** When a thermal total cost is
   supplied, enforce an effective thermal unit rate greater than zero.
6. **Roof-window area must fit within the roof (#11):** Keep enforcing
   `roofWindows.area <= roof.area`.
7. **Carrier requirements (#15):** Keep the existing filtering based on gas,
   biogas, and storage availability.
8. **Discrete values must be integers (#20):** Keep enforcing integer values
   for the number of stories and calendar-year fields.
9. **Renovation chronology (#21):** Enforce that component and heating-system
   years cannot predate `general.buildingYear`.
10. **Roof area must cover the top floor:** Enforce
    `roof.area >= topFloor.area`.

## Calculator

1. **Prevent inferred zero floors (#2):** Clamp the inferred
   `numberOfStories` to a minimum of one.
2. **Prevent negative opaque outer-wall area (#9):** If
   `outerWall.area - adjacentWallArea - exteriorWallWindows.area` is zero or
   negative, use zero as the free opaque wall area.
3. **Prevent negative estimated exterior-window area (#10):** If the default
   exterior-window area calculation produces zero or less, use zero.
4. **Avoid double-counting roof windows (#12):** Calculate opaque-roof heat
   loss from the roof area remaining after subtracting the roof-window area,
   assuming `roof.area` represents gross roof area.
5. **Resolve contradictory basement flags consistently (#14):** Treat
   `isBasementHeated` as false throughout the calculation whenever
   `hasBasement` is false, matching the existing attic behavior.

## Validator

1. **Floors must be positive (#1):** Require `general.numberOfStories` to be an
   integer greater than or equal to one when supplied.
2. **Building base area must be positive (#4):** Require
   `general.buildingBaseArea > 0`.
3. **Thermal bill costs must be consistent (#6):** When a total thermal cost is
   supplied, require the effective thermal base rate to be less than or equal
   to it. The effective value may come from either the input or carrier
   configuration.
4. **Thermal unit rate must be positive (#7):** When a total thermal cost is
   supplied, require the effective thermal unit rate to be greater than zero.
5. **Roof-window area must fit within the roof (#11):** Require
   `roofWindows.area <= roof.area` when an explicit roof-window area is
   supplied.
6. **Carrier requirements (#15):** Apply the existing `isCarrierCompatible()`
   check to the submitted primary energy carrier and the gas, biogas, and
   storage flags.
7. **Discrete values must be integers (#20):** Require integer values for
   `numberOfStories` and numeric calendar-year fields.
8. **Renovation chronology (#21):** Require numeric component and
   heating-system years to be greater than or equal to a numeric
   `general.buildingYear`.
9. **Roof area must cover the top floor:** Require
   `roof.area >= topFloor.area`.

The electricity bill relationship from **#5** cannot currently be checked by
the core input validator: `DETInput` contains electricity consumption, unit
rate, and base rate, but not the total electricity bill cost. It remains a
frontend validation responsibility unless the core input model is extended.

Measures marked as `None`, `Expected`, or `ignore` in the source table are not
included as implementation work.
