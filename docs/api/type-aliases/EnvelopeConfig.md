[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / EnvelopeConfig

# Type Alias: EnvelopeConfig\<TCatalogs\>

> **EnvelopeConfig**\<`TCatalogs`\> = `Readonly`\<\{ `defaultFactor`: `number`; `defaultDeltaUwb`: `number`; `catalogs`: `TCatalogs`; `recommendations`: [`EnvelopeRecommendationConfig`](EnvelopeRecommendationConfig.md); `componentDefaults?`: [`EnvelopeComponentDefaults`](EnvelopeComponentDefaults.md); \}\>

Defined in: [envelope/types.ts:149](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/envelope/types.ts#L149)

Runtime envelope-domain configuration.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* [`UValueCatalogMap`](UValueCatalogMap.md) = [`UValueCatalogMap`](UValueCatalogMap.md)
