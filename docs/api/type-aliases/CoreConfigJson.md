[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / CoreConfigJson

# Type Alias: CoreConfigJson\<TCatalogs, THeatingConfig, TEnergyConfig\>

> **CoreConfigJson**\<`TCatalogs`, `THeatingConfig`, `TEnergyConfig`\> = `Readonly`\<\{ `envelope`: `Readonly`\<\{ `defaultFactor`: `number`; `defaultDeltaUwb`: `number`; `componentDefaults?`: [`EnvelopeComponentDefaults`](EnvelopeComponentDefaults.md); `catalogs`: `TCatalogs`; `recommendations`: [`EnvelopeRecommendationConfig`](EnvelopeRecommendationConfig.md); \}\>; `heating`: `THeatingConfig`; `energy`: `TEnergyConfig`; \}\>

Defined in: [config/core-config-json.ts:44](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/config/core-config-json.ts#L44)

JSON input schema for external core configuration.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* [`JsonCatalogConfigMap`](JsonCatalogConfigMap.md) = [`JsonCatalogConfigMap`](JsonCatalogConfigMap.md)

### THeatingConfig

`THeatingConfig` *extends* [`HeatingConfig`](HeatingConfig.md) = [`HeatingConfig`](HeatingConfig.md)

### TEnergyConfig

`TEnergyConfig` *extends* [`EnergyConfig`](EnergyConfig.md) = [`EnergyConfig`](EnergyConfig.md)
