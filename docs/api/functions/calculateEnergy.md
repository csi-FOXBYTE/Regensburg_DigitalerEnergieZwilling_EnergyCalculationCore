[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / calculateEnergy

# Function: calculateEnergy()

> **calculateEnergy**(`input`, `context`, `config`): [`EnergyResult`](../type-aliases/EnergyResult.md)

Defined in: [energy/calculator.ts:16](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/energy/calculator.ts#L16)

Calculates annual building-energy indicators such as `HV`, `QH`,
final energy demand, and primary energy demand.

## Parameters

### input

[`EnergyInput`](../type-aliases/EnergyInput.md)

Energy-demand inputs and optional overrides.

### context

[`EnergyCalculationContext`](../type-aliases/EnergyCalculationContext.md)

Precomputed core context such as aggregated `HT`.

### config

[`EnergyConfig`](../type-aliases/EnergyConfig.md)

Runtime defaults and factor tables.

## Returns

[`EnergyResult`](../type-aliases/EnergyResult.md)

Calculated energy indicators.
