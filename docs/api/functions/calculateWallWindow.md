[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / calculateWallWindow

# Function: calculateWallWindow()

> **calculateWallWindow**\<`TCatalogs`\>(`input`, `config`): [`WallWindowResult`](../type-aliases/WallWindowResult.md)

Defined in: [envelope/calculators.ts:73](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/envelope/calculators.ts#L73)

Calculates external-wall + window transmission heat losses and derived indicators.

Formula basis:
- `HT = F * U * A` per component
- `totalHt = htWall + htWindow`
- `htPrime = totalHt / referenceArea`

## Type Parameters

### TCatalogs

`TCatalogs` *extends* `Readonly`\<`Record`\<`string`, `Readonly`\<`Record`\<`string`, readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]\>\>\>\>

## Parameters

### input

[`WallWindowInput`](../type-aliases/WallWindowInput.md)\<`TCatalogs`\>

Wall/window input values including optional reference-area override.

### config

[`EnvelopeConfig`](../type-aliases/EnvelopeConfig.md)\<`TCatalogs`\>

Envelope calculation configuration.

## Returns

[`WallWindowResult`](../type-aliases/WallWindowResult.md)

Detailed component result plus recommendations.
