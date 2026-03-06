[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / CoreConfigJson

# Type Alias: CoreConfigJson

> **CoreConfigJson** = `Readonly`\<\{ `envelope`: `Readonly`\<\{ `defaultFactor`: `number`; `defaultDeltaUwb`: `number`; `yearBandLayout?`: readonly [`YearBandRange`](YearBandRange.md)[]; `catalogs`: `Readonly`\<`Record`\<`string`, `Readonly`\<`Record`\<`string`, [`JsonConstructionConfig`](JsonConstructionConfig.md)\>\>\>\>; `recommendations`: [`EnvelopeRecommendationConfig`](EnvelopeRecommendationConfig.md); \}\>; `heating`: [`HeatingConfig`](HeatingConfig.md); \}\>

Defined in: config/core-config-json.ts:22

JSON input schema for external core configuration.
