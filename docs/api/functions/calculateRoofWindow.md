[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / calculateRoofWindow

# Function: calculateRoofWindow()

> **calculateRoofWindow**(`input`, `config`): [`RoofWindowResult`](../type-aliases/RoofWindowResult.md)

Defined in: envelope/calculators.ts:29

Calculates roof + roof-window transmission heat losses and derived indicators.

Formula basis:
- `HT = F * U * A` per component
- `bridgeHt = deltaUwb * referenceArea`
- `totalHt = sumHt + bridgeHt`
- `htPrime = totalHt / referenceArea`

## Parameters

### input

[`RoofWindowInput`](../type-aliases/RoofWindowInput.md)

Roof/roof-window input values including optional overrides.

### config

[`EnvelopeConfig`](../type-aliases/EnvelopeConfig.md)

Envelope calculation configuration.

## Returns

[`RoofWindowResult`](../type-aliases/RoofWindowResult.md)

Detailed component result plus recommendations.
