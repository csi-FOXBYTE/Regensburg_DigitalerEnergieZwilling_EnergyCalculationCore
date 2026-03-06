[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / calculateHeating

# Function: calculateHeating()

> **calculateHeating**(`input`, `config`): [`HeatingResult`](../type-aliases/HeatingResult.md)

Defined in: heating/calculator.ts:18

Evaluates heating-system recommendation status based on configured rule thresholds.

Rule precedence:
1. `noActionTypes`
2. `directReplaceTypes`
3. age-based replace threshold
4. age-based optimize threshold
5. default no-action

## Parameters

### input

[`HeatingInput`](../type-aliases/HeatingInput.md)

Heating system input.

### config

[`HeatingConfig`](../type-aliases/HeatingConfig.md)

Heating recommendation configuration.

## Returns

[`HeatingResult`](../type-aliases/HeatingResult.md)

Heating evaluation result with recommendation.
