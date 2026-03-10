[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / HeatingRecommendationRule

# Type Alias: HeatingRecommendationRule\<THeatingType\>

> **HeatingRecommendationRule**\<`THeatingType`\> = `Readonly`\<\{ `conditions?`: readonly [`RuleCondition`](RuleCondition.md)[]; `action`: [`HeatingRecommendationAction`](HeatingRecommendationAction.md); `reason`: `string`; `preferredReplacement?`: `THeatingType`; `useCarrierReplacement?`: `boolean`; \}\>

Defined in: [heating/types.ts:120](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/heating/types.ts#L120)

Configurable rule for detailed heating recommendations.

## Type Parameters

### THeatingType

`THeatingType` *extends* `string` = `string`
