[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / RuleCondition

# Type Alias: RuleCondition

> **RuleCondition** = `Readonly`\<\{ `field`: `string`; `equals?`: [`RuleValue`](RuleValue.md); `notEquals?`: [`RuleValue`](RuleValue.md); `oneOf?`: readonly [`RuleValue`](RuleValue.md)[]; `min?`: `number`; `max?`: `number`; `exists?`: `boolean`; \}\>

Defined in: [shared/rule-conditions.ts:11](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/shared/rule-conditions.ts#L11)

Generic rule condition evaluated against a calculation input context.

`field` supports dot-notation paths such as `details.insulationPresent`
or `ageYears`.
