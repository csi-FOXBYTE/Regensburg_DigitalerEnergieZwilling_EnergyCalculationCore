[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / calculateCore

# Function: calculateCore()

> **calculateCore**\<`TCatalogs`, `THeatingConfig`, `TEnergyConfig`\>(`input`, `config`): [`CoreResult`](../type-aliases/CoreResult.md)

Defined in: [core/calculate-core.ts:28](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/core/calculate-core.ts#L28)

Executes the full energy-core calculation pipeline and returns
per-domain results plus aggregated KPIs.

Processing order:
1. Envelope domain blocks (`roofWindow`, `wallWindow`, `topFloorCeiling`, `lowestFloor`)
2. Heating domain block (`heating`)
3. Energy domain block (`energy`)
4. Aggregation (`totalHt`, `totalReferenceArea`, `htPrime`)

`aggregateReferenceAreaOverride`, when provided in the input, replaces
the computed sum of component reference areas for the final `htPrime`.

## Type Parameters

### TCatalogs

`TCatalogs` *extends* `Readonly`\<`Record`\<`string`, `Readonly`\<`Record`\<`string`, readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]\>\>\>\>

### THeatingConfig

`THeatingConfig` *extends* `Readonly`\<\{ `referenceYear`: `number`; `replaceAfterYears`: `number`; `optimizeAfterYears`: `number`; `noActionTypes`: readonly `string`[]; `directReplaceTypes`: readonly `string`[]; `replacementByCarrier`: `Readonly`\<`Record`\<[`EnergyCarrier`](../type-aliases/EnergyCarrier.md), `THeatingType`\>\>; `rules?`: readonly `Readonly`\<\{ `conditions?`: readonly `Readonly`\<\{ `field`: `string`; `equals?`: ... \| ...; `notEquals?`: ... \| ...; `oneOf?`: ... \| ...; `min?`: ... \| ...; `max?`: ... \| ...; `exists?`: ... \| ... \| ...; \}\>[]; `action`: [`HeatingRecommendationAction`](../type-aliases/HeatingRecommendationAction.md); `reason`: `string`; `preferredReplacement?`: `string`; `useCarrierReplacement?`: `boolean`; \}\>[]; \}\>

### TEnergyConfig

`TEnergyConfig` *extends* `Readonly`\<\{ `usableAreaFactorFromVolume`: `number`; `internalGainWattsPerM2`: `number`; `heatingPeriodDays`: `number`; `degreeDayFactorMultiplier`: `number`; `ventilationCoefficient`: `number`; `defaultSolarGainUtilizationFactor`: `number`; `domesticHotWaterDemandPerPersonKWhPerYear`: `number`; `occupancyAreaPerPersonM2`: `number`; `defaultFinalEnergyFactor`: `number`; `defaultControlFactor`: `number`; `generationFactorByHeatingType`: `Readonly`\<`Record`\<`string`, readonly [`YearBand`](../type-aliases/YearBand.md)[]\>\>; `controlFactorByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `emitterFactorAdjustmentByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `flowTemperatureAdjustmentBands`: readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]; `radiatorPositionAdjustmentByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `intermittentAdjustmentByEmitterType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `singleRoomControlAdjustmentByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `primaryEnergyFactorByCarrier`: `Readonly`\<`Record`\<[`EnergyCarrier`](../type-aliases/EnergyCarrier.md), `number`\>\>; `fuelCarrierProfileByCarrier`: `Readonly`\<`Record`\<[`EnergyCarrier`](../type-aliases/EnergyCarrier.md), [`FuelCarrierProfile`](../type-aliases/FuelCarrierProfile.md)\>\>; \}\>

## Parameters

### input

[`CoreInput`](../type-aliases/CoreInput.md)\<`TCatalogs`, [`HeatingTypeFromConfigs`](../type-aliases/HeatingTypeFromConfigs.md)\<`THeatingConfig`, `TEnergyConfig`\>\>

External input values for all enabled domains.

### config

[`CoreConfig`](../type-aliases/CoreConfig.md)\<`TCatalogs`, `THeatingConfig`, `TEnergyConfig`\>

Runtime configuration (catalogs, recommendation rules, thresholds).

## Returns

[`CoreResult`](../type-aliases/CoreResult.md)

Structured domain results and aggregate metrics.
