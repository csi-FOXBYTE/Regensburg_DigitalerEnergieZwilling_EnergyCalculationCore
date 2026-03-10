[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / RoofWindowInput

# Type Alias: RoofWindowInput\<TCatalogs\>

> **RoofWindowInput**\<`TCatalogs`\> = `Readonly`\<\{ `roof`: [`SurfaceInput`](SurfaceInput.md)\<`TCatalogs`\>; `roofWindow`: [`SurfaceInput`](SurfaceInput.md)\<`TCatalogs`\>; `deltaUwb?`: `number`; `envelopeArea?`: `number`; \}\>

Defined in: [envelope/types.ts:50](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/envelope/types.ts#L50)

Input for the roof + roof-window block.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* [`UValueCatalogMap`](UValueCatalogMap.md) = [`UValueCatalogMap`](UValueCatalogMap.md)
