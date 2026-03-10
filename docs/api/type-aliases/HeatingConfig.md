[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / HeatingConfig

# Type Alias: HeatingConfig\<THeatingType\>

> **HeatingConfig**\<`THeatingType`\> = `Readonly`\<\{ `referenceYear`: `number`; `replaceAfterYears`: `number`; `optimizeAfterYears`: `number`; `noActionTypes`: readonly `THeatingType`[]; `directReplaceTypes`: readonly `THeatingType`[]; `replacementByCarrier`: `Readonly`\<`Record`\<[`EnergyCarrier`](EnergyCarrier.md), `THeatingType`\>\>; `rules?`: readonly [`HeatingRecommendationRule`](HeatingRecommendationRule.md)\<`THeatingType`\>[]; \}\>

Defined in: [heating/types.ts:133](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/heating/types.ts#L133)

Runtime heating-domain configuration.

## Type Parameters

### THeatingType

`THeatingType` *extends* `string` = `string`
