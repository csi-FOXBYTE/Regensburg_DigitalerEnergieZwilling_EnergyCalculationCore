[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / CoreResult

# Type Alias: CoreResult

> **CoreResult** = `Readonly`\<\{ `roofWindow?`: [`RoofWindowResult`](RoofWindowResult.md); `wallWindow?`: [`WallWindowResult`](WallWindowResult.md); `topFloorCeiling?`: [`SingleSurfaceResult`](SingleSurfaceResult.md); `lowestFloor?`: [`SingleSurfaceResult`](SingleSurfaceResult.md); `heating?`: [`HeatingResult`](HeatingResult.md); `energy?`: [`EnergyResult`](EnergyResult.md); `aggregate`: `Readonly`\<\{ `totalHt`: `number`; `totalReferenceArea`: `number`; `htPrime`: `number`; \}\>; \}\>

Defined in: [core/types.ts:45](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/core/types.ts#L45)

Top-level output payload of the core orchestrator.
