[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / NormalizedCatalogMap

# Type Alias: NormalizedCatalogMap\<TCatalogs\>

> **NormalizedCatalogMap**\<`TCatalogs`\> = `Readonly`\<`{ [TCatalog in keyof TCatalogs]: Readonly<{ [TConstruction in keyof TCatalogs[TCatalog]]: readonly YearBand[] }> }`\>

Defined in: [config/core-config-json.ts:33](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/config/core-config-json.ts#L33)

Runtime catalog map derived from a JSON catalog config map.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* [`JsonCatalogConfigMap`](JsonCatalogConfigMap.md)
