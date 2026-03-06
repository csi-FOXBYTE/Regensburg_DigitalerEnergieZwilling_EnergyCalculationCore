[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / CoreResult

# Type Alias: CoreResult

> **CoreResult** = `Readonly`\<\{ `roofWindow?`: [`RoofWindowResult`](RoofWindowResult.md); `wallWindow?`: [`WallWindowResult`](WallWindowResult.md); `ogd?`: [`SingleSurfaceResult`](SingleSurfaceResult.md); `ugd?`: [`SingleSurfaceResult`](SingleSurfaceResult.md); `heating?`: [`HeatingResult`](HeatingResult.md); `aggregate`: `Readonly`\<\{ `totalHt`: `number`; `totalReferenceArea`: `number`; `htPrime`: `number`; \}\>; \}\>

Defined in: core/types.ts:34

Top-level output payload of the core orchestrator.
