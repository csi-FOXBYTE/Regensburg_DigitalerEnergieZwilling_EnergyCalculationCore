[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / calculateCore

# Function: calculateCore()

> **calculateCore**(`input`, `config`): [`CoreResult`](../type-aliases/CoreResult.md)

Defined in: core/calculate-core.ts:23

Executes the full energy-core calculation pipeline and returns
per-domain results plus aggregated KPIs.

Processing order:
1. Envelope domain blocks (`roofWindow`, `wallWindow`, `ogd`, `ugd`)
2. Heating domain block (`heating`)
3. Aggregation (`totalHt`, `totalReferenceArea`, `htPrime`)

`aggregateReferenceAreaOverride`, when provided in the input, replaces
the computed sum of component reference areas for the final `htPrime`.

## Parameters

### input

[`CoreInput`](../type-aliases/CoreInput.md)

External input values for all enabled domains.

### config

[`CoreConfig`](../type-aliases/CoreConfig.md)

Runtime configuration (catalogs, recommendation rules, thresholds).

## Returns

[`CoreResult`](../type-aliases/CoreResult.md)

Structured domain results and aggregate metrics.
