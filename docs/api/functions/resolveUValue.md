[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / resolveUValue

# Function: resolveUValue()

> **resolveUValue**(`source`, `catalogs`): `number`

Defined in: catalogs/u-value.ts:12

Resolves a U-value either directly from input or via catalog/year lookup.

## Parameters

### source

[`UValueSource`](../type-aliases/UValueSource.md)

Direct U-value source or catalog-based lookup source.

### catalogs

[`UValueCatalogMap`](../type-aliases/UValueCatalogMap.md)

Configured U-value catalogs.

## Returns

`number`

Resolved U-value.

## Throws

If catalog/construction is missing or no year band matches.
