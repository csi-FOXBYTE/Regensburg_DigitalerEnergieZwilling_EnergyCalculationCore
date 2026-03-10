[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / resolveUValue

# Function: resolveUValue()

> **resolveUValue**\<`TCatalogs`\>(`source`, `catalogs`): `number`

Defined in: [catalogs/u-value.ts:12](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/catalogs/u-value.ts#L12)

Resolves a U-value either directly from input or via catalog/year lookup.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* `Readonly`\<`Record`\<`string`, `Readonly`\<`Record`\<`string`, readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]\>\>\>\>

## Parameters

### source

[`UValueSource`](../type-aliases/UValueSource.md)\<`TCatalogs`\>

Direct U-value source or catalog-based lookup source.

### catalogs

`TCatalogs`

Configured U-value catalogs.

## Returns

`number`

Resolved U-value.

## Throws

If catalog/construction is missing or no year band matches.
