[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / UValueLookupSource

# Type Alias: UValueLookupSource\<TCatalogs\>

> **UValueLookupSource**\<`TCatalogs`\> = \[[`CatalogName`](CatalogName.md)\<`TCatalogs`\>\] *extends* \[`never`\] ? `Readonly`\<\{ `catalog`: `string`; `construction`: `string`; `year`: `number`; \}\> : `{ [TCatalog in CatalogName<TCatalogs>]: Readonly<{ catalog: TCatalog; construction: ConstructionName<TCatalogs, TCatalog>; year: number }> }`\[[`CatalogName`](CatalogName.md)\<`TCatalogs`\>\]

Defined in: [catalogs/types.ts:60](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/catalogs/types.ts#L60)

Catalog/year lookup descriptor.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* [`UValueCatalogMap`](UValueCatalogMap.md) = [`UValueCatalogMap`](UValueCatalogMap.md)
