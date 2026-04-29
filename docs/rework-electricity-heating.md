# Rework: Electricity & Heating Demand Split

## Step 1 — Individual component heating demands and shares

Each heat loss component gets a new resolver:

**`{component}HeatingDemand`: number**
```
componentHeatLoss × heatingDegreeDays × 0.024
```

Components: `outerWall`, `bottomFloor`, `topFloor`, `roof`, `exteriorWallWindows`,
`roofWindows`, `ventilation`

**Fix the conditional in `heatLossSum`:** the roof/topFloor selection via
`isSpaceBelowRoofHeated` moves out of `heatLossSum` and into the individual heat loss
resolvers. Both components are always summed unconditionally — whichever one does not
apply resolves to `0`.

- `roofHeatLoss` → returns `0` when `!isSpaceBelowRoofHeated`
- `topFloorHeatLoss` → returns `0` when `isSpaceBelowRoofHeated`

---

## Step 2 — Electricity type

Mirrors the `primaryEnergyCarrier` pattern. Replaces `hasRenewableEnergy`.

**Config additions to `DETHeatConfig`:**
- `electricityTypes: string[]` — catalogue of available types (e.g. renewable, other)
- `defaultElectricityType: string`
- `electricityTypeData: KeyedValues<string, ElectricityTypeData>` — co2Factor, unitRate, baseRate per type

**Input additions:**
- `electricityType?: string | null` — user override, falls back to config default
- `electricityUnitRate?: number | null` — user override for their actual price per kWh

**New resolvers:**

**`electricityType`: string**
```
input override or config: defaultElectricityType
```

**`electricityTypeData`: ElectricityTypeData**
```
config keyed by electricityType
```

**`electricityCo2Factor`: number**
```
electricityTypeData.co2Factor
```

**`electricityUnitRate`: number**
```
user override or electricityTypeData.unitRate
```

Cost and co2 calculations that consume `electricalEnergyDemand` are added in Step 3
once the demand split exists.

---

## Step 3 — Electrical ratio config

Add `electricalRatio: KeyedValues<string, number>` to `DETHeatConfig`, keyed by
`heatingSystemType`. Represents what fraction of heating demand is covered electrically.
Not user-overridable — it is an emergent property of the system, not a datasheet value.

```
// example entries
gas boiler      → 0
oil boiler      → 0
district heat   → 0
heat pump       → 1
gas/heat pump hybrid → 0.5
```

New resolver **`electricalRatio`: number**
```
config keyed by heatingSystemType
```

New resolvers for the demand split:

**`thermalHeatingDemand`: number**
```
heatingEnergyDemand × (1 - electricalRatio)
```

**`electricalHeatingDemand`: number**
```
heatingEnergyDemand × electricalRatio
```

Hot water is produced by the same heating system, so it follows the same ratio.
The split therefore applies to `totalEnergyDemand` directly:

**`thermalEnergyDemand`: number**
```
totalEnergyDemand × (1 - electricalRatio)
```

**`calculatedElectricalEnergyDemand`: number**
```
calculatedTotalEnergyDemand × electricalRatio
```
The pure model-calculated electrical demand, used as the baseline for the offset in Step 6.

**`electricalEnergyDemand`: number**
```
totalEnergyDemand × electricalRatio
```
Superseded in Step 6 once the offset is introduced.

`totalEnergyDemand` stays mathematically identical — no breaking change. The split
collapses correctly for all system types: pure electric → full demand on electrical side,
non-electric → full demand on thermal side, hybrid → split by ratio.

---

## Step 4 — Wire up downstream resolvers

Existing resolvers shift from `totalEnergyDemand` to `thermalEnergyDemand`.
New resolvers are added for the electrical side. Combined totals replace the old singles.

**New input:**
- `userThermalUnitRate?: number | null` — user's actual price per carrier unit (e.g. €/m³); only valid when carrier has not switched

**Thermal side** (existing resolvers, retargeted):

**`thermalCarrierConsumption`: number**
```
thermalEnergyDemand / primaryEnergyCarrierData.energyPerUnit
```

**`thermalUnitRate`**: number
```
userThermalUnitRate    when provided AND (no pre-renovation bundle OR primaryEnergyCarrier == preRenovationPrimaryEnergyCarrier)
primaryEnergyCarrierData.unitRate    otherwise (carrier switched, or no user override)
```

**`thermalCarrierCost`: number**
```
thermalCarrierConsumption × thermalUnitRate + primaryEnergyCarrierData.baseRate
```

**`thermalCo2Emissions`: number**
```
thermalEnergyDemand × primaryEnergyCarrierData.co2Factor × 0.000001
```

**`thermalPrimaryEnergyDemand`: number**
```
thermalEnergyDemand × primaryEnergyCarrierEfficiencyFactor
```

**Electrical side** (new resolvers):

**`electricityConsumption`: number**
```
electricalEnergyDemand  (already in kWh, no unit conversion needed)
```

**`electricityCost`: number**
```
electricalEnergyDemand × electricityUnitRate + electricityTypeData.baseRate
```

**`electricityCo2Emissions`: number**
```
electricalEnergyDemand × electricityCo2Factor × 0.000001
```

**`electricalPrimaryEnergyDemand`: number**
```
electricalEnergyDemand × electricityTypeData.primaryEnergyFactor
```
Note: `primaryEnergyFactor` is added to `electricityTypeData` (e.g. 1.8 for grid, 0 for renewable).

**Combined totals:**

**`primaryEnergyDemand`: number**
```
thermalPrimaryEnergyDemand + electricalPrimaryEnergyDemand
```

**`totalCost`: number**
```
thermalCarrierCost + electricityCost
```

**`totalCo2Emissions`: number**
```
thermalCo2Emissions + electricityCo2Emissions
```

**Unchanged:**
```
primaryEnergyDemandPerSquareMeter   primaryEnergyDemand / usableFloorArea
totalEnergyDemandPerSquareMeter     totalEnergyDemand / usableFloorArea
energyEfficiencyClass               rangeBand by primaryEnergyDemandPerSquareMeter
```

**Renamed:**
`totalEnergyDemand` → `calculatedTotalEnergyDemand` (the pure model formula; `totalEnergyDemand` is taken over in Step 5)

---

## Step 5 — Pre-renovation inputs and projected demand

**New inputs:**
- `preRenovationTotalEnergyDemand?: number | null` — the calculated `totalEnergyDemand` from a clean (no-renovation) run, fed back in as input by the frontend
- `preRenovationPrimaryEnergyCarrier?: string | null` — carrier before renovation; determines which `energyPerUnit` to use when back-calculating from the user's bill
- `preRenovationHeatingSystemType?: string | null` — system type before renovation; used to look up the old `electricalRatio`
- `userThermalConsumption?: number | null` — user's actual thermal consumption from their bill in native units (m³, L, etc.)

**New resolvers:**

**`preRenovationCarrierData`**: PrimaryEnergyCarrierData
```
config keyed by (preRenovationPrimaryEnergyCarrier ?? primaryEnergyCarrier)
```

**`preRenovationElectricalRatio`**: number
```
config keyed by (preRenovationHeatingSystemType ?? heatingSystemType)
```

**`userThermalEnergyDemand`**: number
```
userThermalConsumption × preRenovationCarrierData.energyPerUnit
```

**`userTotalEnergyDemand`**: number
```
userThermalEnergyDemand / (1 - preRenovationElectricalRatio)
```
Reconstructs the user's actual total demand from the thermal bill portion using the old system's electrical ratio.

**`renovationFactor`**: number
```
calculatedTotalEnergyDemand / preRenovationTotalEnergyDemand
```
Defaults to `1` when `preRenovationTotalEnergyDemand` is absent.

**`totalEnergyDemand`**: number  *(replaces the previous resolver of the same name)*
```
userTotalEnergyDemand × renovationFactor   when userThermalConsumption is provided
calculatedTotalEnergyDemand               otherwise
```
`thermalEnergyDemand` and `electricalEnergyDemand` derive from this unchanged — downstream resolvers require no modification.

Note: all pre-renovation inputs (`preRenovationTotalEnergyDemand`, `preRenovationPrimaryEnergyCarrier`, `preRenovationHeatingSystemType`, `preRenovationElectricityOffset`) are treated as an atomic bundle — either all are provided or none.

---

## Step 6 — Electrical consumption offset

**New inputs:**
- `userElectricityConsumption?: number | null` — user's electricity bill in kWh (includes heating electricity, personal use, solar offset)
- `preRenovationElectricityOffset?: number | null` — part of the pre-renovation bundle; the offset computed in the previous run, stored by the frontend and fed back in

**`electricityOffset`**: number
```
preRenovationElectricityOffset                                      when pre-renovation bundle is present
userElectricityConsumption - calculatedElectricalEnergyDemand       when userElectricityConsumption provided (first run)
0                                                                   otherwise
```

**`electricalEnergyDemand`** *(updated from Step 3)*: number
```
calculatedTotalEnergyDemand × electricalRatio + electricityOffset
```

`electricityOffset` is also a calculation output — the frontend stores it and includes it in the pre-renovation bundle on subsequent runs.

Note: after this step `thermalEnergyDemand + electricalEnergyDemand ≠ totalEnergyDemand`. The offset represents personal use and solar that are not part of the heating system's demand. This is intentional.
