[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / CoreConfig

# Type Alias: CoreConfig\<TCatalogs, THeatingConfig, TEnergyConfig\>

> **CoreConfig**\<`TCatalogs`, `THeatingConfig`, `TEnergyConfig`\> = `Readonly`\<\{ `envelope`: [`EnvelopeConfig`](EnvelopeConfig.md)\<`TCatalogs`\>; `heating`: `THeatingConfig`; `energy`: `TEnergyConfig`; \}\>

Defined in: [core/types.ts:30](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/core/types.ts#L30)

Top-level runtime configuration for all domains.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* [`UValueCatalogMap`](UValueCatalogMap.md) = [`UValueCatalogMap`](UValueCatalogMap.md)

### THeatingConfig

`THeatingConfig` *extends* [`HeatingConfig`](HeatingConfig.md) = [`HeatingConfig`](HeatingConfig.md)

### TEnergyConfig

`TEnergyConfig` *extends* [`EnergyConfig`](EnergyConfig.md) = [`EnergyConfig`](EnergyConfig.md)
