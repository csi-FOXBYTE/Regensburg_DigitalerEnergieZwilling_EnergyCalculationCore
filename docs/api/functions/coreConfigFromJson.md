[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / coreConfigFromJson

# Function: coreConfigFromJson()

> **coreConfigFromJson**\<`TCatalogs`, `THeatingConfig`, `TEnergyConfig`\>(`input`): [`CoreConfig`](../type-aliases/CoreConfig.md)\<[`NormalizedCatalogMap`](../type-aliases/NormalizedCatalogMap.md)\<`TCatalogs`\>, `THeatingConfig`, `TEnergyConfig`\>

Defined in: [config/core-config-json.ts:67](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/config/core-config-json.ts#L67)

Converts an external JSON configuration object into the internal runtime config.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* `Readonly`\<`Record`\<`string`, `Readonly`\<`Record`\<`string`, [`JsonConstructionConfig`](../type-aliases/JsonConstructionConfig.md)\>\>\>\>

### THeatingConfig

`THeatingConfig` *extends* `Readonly`\<\{ `referenceYear`: `number`; `replaceAfterYears`: `number`; `optimizeAfterYears`: `number`; `noActionTypes`: readonly `string`[]; `directReplaceTypes`: readonly `string`[]; `replacementByCarrier`: `Readonly`\<`Record`\<[`EnergyCarrier`](../type-aliases/EnergyCarrier.md), `THeatingType`\>\>; `rules?`: readonly `Readonly`\<\{ `conditions?`: readonly `Readonly`\<\{ `field`: `string`; `equals?`: ... \| ...; `notEquals?`: ... \| ...; `oneOf?`: ... \| ...; `min?`: ... \| ...; `max?`: ... \| ...; `exists?`: ... \| ... \| ...; \}\>[]; `action`: [`HeatingRecommendationAction`](../type-aliases/HeatingRecommendationAction.md); `reason`: `string`; `preferredReplacement?`: `string`; `useCarrierReplacement?`: `boolean`; \}\>[]; \}\>

### TEnergyConfig

`TEnergyConfig` *extends* `Readonly`\<\{ `usableAreaFactorFromVolume`: `number`; `internalGainWattsPerM2`: `number`; `heatingPeriodDays`: `number`; `degreeDayFactorMultiplier`: `number`; `ventilationCoefficient`: `number`; `defaultSolarGainUtilizationFactor`: `number`; `domesticHotWaterDemandPerPersonKWhPerYear`: `number`; `occupancyAreaPerPersonM2`: `number`; `defaultFinalEnergyFactor`: `number`; `defaultControlFactor`: `number`; `generationFactorByHeatingType`: `Readonly`\<`Record`\<`string`, readonly [`YearBand`](../type-aliases/YearBand.md)[]\>\>; `controlFactorByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `emitterFactorAdjustmentByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `flowTemperatureAdjustmentBands`: readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]; `radiatorPositionAdjustmentByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `intermittentAdjustmentByEmitterType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `singleRoomControlAdjustmentByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `primaryEnergyFactorByCarrier`: `Readonly`\<`Record`\<[`EnergyCarrier`](../type-aliases/EnergyCarrier.md), `number`\>\>; `fuelCarrierProfileByCarrier`: `Readonly`\<`Record`\<[`EnergyCarrier`](../type-aliases/EnergyCarrier.md), [`FuelCarrierProfile`](../type-aliases/FuelCarrierProfile.md)\>\>; \}\>

## Parameters

### input

[`CoreConfigJson`](../type-aliases/CoreConfigJson.md)\<`TCatalogs`, `THeatingConfig`, `TEnergyConfig`\>

External JSON configuration object.

## Returns

[`CoreConfig`](../type-aliases/CoreConfig.md)\<[`NormalizedCatalogMap`](../type-aliases/NormalizedCatalogMap.md)\<`TCatalogs`\>, `THeatingConfig`, `TEnergyConfig`\>

Internal normalized core configuration.
