[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / CoreInput

# Type Alias: CoreInput\<TCatalogs, THeatingType\>

> **CoreInput**\<`TCatalogs`, `THeatingType`\> = `Readonly`\<\{ `roofWindow?`: [`RoofWindowInput`](RoofWindowInput.md)\<`TCatalogs`\>; `wallWindow?`: [`WallWindowInput`](WallWindowInput.md)\<`TCatalogs`\>; `topFloorCeiling?`: [`SurfaceInput`](SurfaceInput.md)\<`TCatalogs`\>; `lowestFloor?`: [`SurfaceInput`](SurfaceInput.md)\<`TCatalogs`\>; `heating?`: [`HeatingInput`](HeatingInput.md)\<`THeatingType`\>; `energy?`: [`EnergyInput`](EnergyInput.md); `aggregateReferenceAreaOverride?`: `number`; \}\>

Defined in: [core/types.ts:12](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/core/types.ts#L12)

Top-level input payload for the core orchestrator.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* [`UValueCatalogMap`](UValueCatalogMap.md) = [`UValueCatalogMap`](UValueCatalogMap.md)

### THeatingType

`THeatingType` *extends* `string` = `string`
