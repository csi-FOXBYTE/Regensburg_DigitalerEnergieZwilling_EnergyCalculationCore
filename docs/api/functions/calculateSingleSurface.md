[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / calculateSingleSurface

# Function: calculateSingleSurface()

> **calculateSingleSurface**\<`TCatalogs`\>(`input`, `rules`, `component`, `config`): [`SingleSurfaceResult`](../type-aliases/SingleSurfaceResult.md)

Defined in: [envelope/calculators.ts:107](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/envelope/calculators.ts#L107)

Calculates a single surface transmission heat loss block.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* `Readonly`\<`Record`\<`string`, `Readonly`\<`Record`\<`string`, readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]\>\>\>\>

## Parameters

### input

[`SurfaceInput`](../type-aliases/SurfaceInput.md)\<`TCatalogs`\>

Single surface input values.

### rules

readonly `Readonly`\<\{ `minAge?`: `number`; `maxAge?`: `number`; `conditions?`: readonly `Readonly`\<\{ `field`: `string`; `equals?`: [`RuleValue`](../type-aliases/RuleValue.md); `notEquals?`: [`RuleValue`](../type-aliases/RuleValue.md); `oneOf?`: readonly [`RuleValue`](../type-aliases/RuleValue.md)[]; `min?`: `number`; `max?`: `number`; `exists?`: `boolean`; \}\>[]; `action`: [`RecommendationAction`](../type-aliases/RecommendationAction.md); `reason`: `string`; `targetUValue?`: `number`; \}\>[]

Age-based recommendation rules for this component.

### component

`string`

Component identifier used in recommendation output.

### config

[`EnvelopeConfig`](../type-aliases/EnvelopeConfig.md)\<`TCatalogs`\>

Envelope calculation configuration.

## Returns

[`SingleSurfaceResult`](../type-aliases/SingleSurfaceResult.md)

Surface HT result plus optional recommendation.
