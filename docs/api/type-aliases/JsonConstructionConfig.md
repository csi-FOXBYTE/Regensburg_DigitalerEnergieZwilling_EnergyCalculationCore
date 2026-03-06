[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / JsonConstructionConfig

# Type Alias: JsonConstructionConfig

> **JsonConstructionConfig** = readonly `number`[] \| readonly [`YearBand`](YearBand.md)[]

Defined in: config/core-config-json.ts:15

JSON representation for one construction entry in a catalog.

Numeric arrays are interpreted via `envelope.yearBandLayout`.
Explicit year-band arrays can be passed directly.
