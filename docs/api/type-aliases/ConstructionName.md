[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / ConstructionName

# Type Alias: ConstructionName\<TCatalogs, TCatalog\>

> **ConstructionName**\<`TCatalogs`, `TCatalog`\> = \[`Extract`\<keyof `TCatalogs`\[`TCatalog`\], `string`\>\] *extends* \[`never`\] ? `string` : `Extract`\<keyof `TCatalogs`\[`TCatalog`\], `string`\>

Defined in: [catalogs/types.ts:48](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/catalogs/types.ts#L48)

Construction-name union derived from a concrete catalog map and catalog name.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* [`UValueCatalogMap`](UValueCatalogMap.md)

### TCatalog

`TCatalog` *extends* [`CatalogName`](CatalogName.md)\<`TCatalogs`\>
