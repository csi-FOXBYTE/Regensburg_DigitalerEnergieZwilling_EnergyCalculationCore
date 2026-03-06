[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / calculateWallWindow

# Function: calculateWallWindow()

> **calculateWallWindow**(`input`, `config`): [`WallWindowResult`](../type-aliases/WallWindowResult.md)

Defined in: envelope/calculators.ts:68

Calculates external-wall + window transmission heat losses and derived indicators.

Formula basis:
- `HT = F * U * A` per component
- `totalHt = htWall + htWindow`
- `htPrime = totalHt / referenceArea`

## Parameters

### input

[`WallWindowInput`](../type-aliases/WallWindowInput.md)

Wall/window input values including optional reference-area override.

### config

[`EnvelopeConfig`](../type-aliases/EnvelopeConfig.md)

Envelope calculation configuration.

## Returns

[`WallWindowResult`](../type-aliases/WallWindowResult.md)

Detailed component result plus recommendations.
