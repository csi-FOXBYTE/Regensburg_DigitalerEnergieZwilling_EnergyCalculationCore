[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / EnergyConfig

# Type Alias: EnergyConfig

> **EnergyConfig** = `Readonly`\<\{ `usableAreaFactorFromVolume`: `number`; `internalGainWattsPerM2`: `number`; `heatingPeriodDays`: `number`; `degreeDayFactorMultiplier`: `number`; `ventilationCoefficient`: `number`; `defaultSolarGainUtilizationFactor`: `number`; `domesticHotWaterDemandPerPersonKWhPerYear`: `number`; `occupancyAreaPerPersonM2`: `number`; `defaultFinalEnergyFactor`: `number`; `defaultControlFactor`: `number`; `generationFactorByHeatingType`: `Readonly`\<`Record`\<`string`, readonly [`YearBand`](YearBand.md)[]\>\>; `controlFactorByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `emitterFactorAdjustmentByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `flowTemperatureAdjustmentBands`: readonly [`YearBand`](YearBand.md)[]; `radiatorPositionAdjustmentByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `intermittentAdjustmentByEmitterType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `singleRoomControlAdjustmentByType`: `Readonly`\<`Record`\<`string`, `number`\>\>; `primaryEnergyFactorByCarrier`: `Readonly`\<`Record`\<[`EnergyCarrier`](EnergyCarrier.md), `number`\>\>; `fuelCarrierProfileByCarrier`: `Readonly`\<`Record`\<[`EnergyCarrier`](EnergyCarrier.md), [`FuelCarrierProfile`](FuelCarrierProfile.md)\>\>; \}\>

Defined in: [energy/types.ts:94](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/energy/types.ts#L94)

Runtime defaults and factor tables for annual energy-demand calculations.
