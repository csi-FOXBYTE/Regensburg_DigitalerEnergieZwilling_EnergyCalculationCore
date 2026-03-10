[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / EnergyInput

# Type Alias: EnergyInput

> **EnergyInput** = `Readonly`\<\{ `transmissionHeatLossWPerK?`: `number`; `ventilationHeatTransferCoefficientWPerK?`: `number`; `heatedAirVolumeM3?`: `number`; `airChangeRate?`: `number`; `degreeDaysKdPerA`: `number`; `solarGainUtilizationFactor?`: `number`; `usableAreaM2?`: `number`; `solarGainsKWhPerYear?`: `number`; `solarGainEntries?`: readonly [`SolarGainInput`](SolarGainInput.md)[]; `internalGainsKWhPerYear?`: `number`; `domesticHotWaterDemandKWhPerYear?`: `number`; `peopleCount?`: `number`; `finalEnergyFactor?`: `number`; `primaryEnergyFactor?`: `number`; `generatorEfficiency?`: `number`; `fuelConsumptionPerYear?`: `number`; `fuelConsumptionUnitsPerKWh?`: `number`; `fuelUnit?`: `string`; `specificFuelCostPerUnit?`: `number`; `co2KgPerFuelUnit?`: `number`; \}\>

Defined in: [energy/types.ts:22](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/energy/types.ts#L22)

Optional energy-demand input block used for annual demand indicators.
