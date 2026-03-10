[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / calculateHeating

# Function: calculateHeating()

> **calculateHeating**\<`TConfig`\>(`input`, `config`): [`HeatingResult`](../type-aliases/HeatingResult.md)\<[`HeatingTypeFromConfig`](../type-aliases/HeatingTypeFromConfig.md)\<`TConfig`\>\>

Defined in: [heating/calculator.ts:19](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/heating/calculator.ts#L19)

Evaluates heating-system recommendation status based on configured rule thresholds.

Rule precedence:
1. `noActionTypes`
2. `directReplaceTypes`
3. age-based replace threshold
4. age-based optimize threshold
5. default no-action

## Type Parameters

### TConfig

`TConfig` *extends* `Readonly`\<\{ `referenceYear`: `number`; `replaceAfterYears`: `number`; `optimizeAfterYears`: `number`; `noActionTypes`: readonly `string`[]; `directReplaceTypes`: readonly `string`[]; `replacementByCarrier`: `Readonly`\<`Record`\<[`EnergyCarrier`](../type-aliases/EnergyCarrier.md), `THeatingType`\>\>; `rules?`: readonly `Readonly`\<\{ `conditions?`: readonly `Readonly`\<\{ `field`: `string`; `equals?`: ... \| ...; `notEquals?`: ... \| ...; `oneOf?`: ... \| ...; `min?`: ... \| ...; `max?`: ... \| ...; `exists?`: ... \| ... \| ...; \}\>[]; `action`: [`HeatingRecommendationAction`](../type-aliases/HeatingRecommendationAction.md); `reason`: `string`; `preferredReplacement?`: `string`; `useCarrierReplacement?`: `boolean`; \}\>[]; \}\>

## Parameters

### input

[`HeatingInput`](../type-aliases/HeatingInput.md)\<[`HeatingTypeFromConfig`](../type-aliases/HeatingTypeFromConfig.md)\<`TConfig`\>\>

Heating system input.

### config

`TConfig`

Heating recommendation configuration.

## Returns

[`HeatingResult`](../type-aliases/HeatingResult.md)\<[`HeatingTypeFromConfig`](../type-aliases/HeatingTypeFromConfig.md)\<`TConfig`\>\>

Heating evaluation result with recommendation.
