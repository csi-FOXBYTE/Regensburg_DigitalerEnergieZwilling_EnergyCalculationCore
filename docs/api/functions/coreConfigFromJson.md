[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / coreConfigFromJson

# Function: coreConfigFromJson()

> **coreConfigFromJson**(`input`): [`CoreConfig`](../type-aliases/CoreConfig.md)

Defined in: config/core-config-json.ts:43

Converts an external JSON configuration object into the internal runtime config.

Numeric construction arrays are expanded using `envelope.yearBandLayout`.
Explicit `{ from?, to?, value }` arrays are forwarded as-is.

## Parameters

### input

[`CoreConfigJson`](../type-aliases/CoreConfigJson.md)

External JSON configuration object.

## Returns

[`CoreConfig`](../type-aliases/CoreConfig.md)

Internal normalized core configuration.
