[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / CoreInput

# Type Alias: CoreInput\<TCatalogs, THeatingType\>

> **CoreInput**\<`TCatalogs`, `THeatingType`\> = `Readonly`\<\{ `roofWindow?`: [`RoofWindowInput`](RoofWindowInput.md)\<`TCatalogs`\>; `wallWindow?`: [`WallWindowInput`](WallWindowInput.md)\<`TCatalogs`\>; `topFloorCeiling?`: [`SurfaceInput`](SurfaceInput.md)\<`TCatalogs`\>; `lowestFloor?`: [`SurfaceInput`](SurfaceInput.md)\<`TCatalogs`\>; `heating?`: [`HeatingInput`](HeatingInput.md)\<`THeatingType`\>; `energy?`: [`EnergyInput`](EnergyInput.md); `aggregateReferenceAreaOverride?`: `number`; \}\>

Defined in: [core/types.ts:12](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/core/types.ts#L12)

Top-level input payload for the core orchestrator.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* [`UValueCatalogMap`](UValueCatalogMap.md) = [`UValueCatalogMap`](UValueCatalogMap.md)

### THeatingType

`THeatingType` *extends* `string` = `string`
