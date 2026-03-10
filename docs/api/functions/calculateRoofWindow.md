[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / calculateRoofWindow

# Function: calculateRoofWindow()

> **calculateRoofWindow**\<`TCatalogs`\>(`input`, `config`): [`RoofWindowResult`](../type-aliases/RoofWindowResult.md)

Defined in: [envelope/calculators.ts:31](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/envelope/calculators.ts#L31)

Calculates roof + roof-window transmission heat losses and derived indicators.

Formula basis:
- `HT = F * U * A` per component
- `bridgeHt = deltaUwb * referenceArea`
- `totalHt = sumHt + bridgeHt`
- `htPrime = totalHt / referenceArea`

## Type Parameters

### TCatalogs

`TCatalogs` *extends* `Readonly`\<`Record`\<`string`, `Readonly`\<`Record`\<`string`, readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]\>\>\>\>

## Parameters

### input

[`RoofWindowInput`](../type-aliases/RoofWindowInput.md)\<`TCatalogs`\>

Roof/roof-window input values including optional overrides.

### config

[`EnvelopeConfig`](../type-aliases/EnvelopeConfig.md)\<`TCatalogs`\>

Envelope calculation configuration.

## Returns

[`RoofWindowResult`](../type-aliases/RoofWindowResult.md)

Detailed component result plus recommendations.
