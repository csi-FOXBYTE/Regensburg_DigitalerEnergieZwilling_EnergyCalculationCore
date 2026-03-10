[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / EnvelopeConfig

# Type Alias: EnvelopeConfig\<TCatalogs\>

> **EnvelopeConfig**\<`TCatalogs`\> = `Readonly`\<\{ `defaultFactor`: `number`; `defaultDeltaUwb`: `number`; `catalogs`: `TCatalogs`; `recommendations`: [`EnvelopeRecommendationConfig`](EnvelopeRecommendationConfig.md); `componentDefaults?`: [`EnvelopeComponentDefaults`](EnvelopeComponentDefaults.md); \}\>

Defined in: [envelope/types.ts:149](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/envelope/types.ts#L149)

Runtime envelope-domain configuration.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* [`UValueCatalogMap`](UValueCatalogMap.md) = [`UValueCatalogMap`](UValueCatalogMap.md)
