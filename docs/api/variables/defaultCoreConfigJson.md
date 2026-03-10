[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / defaultCoreConfigJson

# Variable: defaultCoreConfigJson

> `const` **defaultCoreConfigJson**: `object`

Defined in: [config/default-core-config.ts:21](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/config/default-core-config.ts#L21)

Default external JSON configuration used as project baseline.

## Type Declaration

### envelope

> **envelope**: `object`

#### envelope.defaultFactor

> **defaultFactor**: `number` = `1`

#### envelope.defaultDeltaUwb

> **defaultDeltaUwb**: `number` = `0.1`

#### envelope.componentDefaults

> **componentDefaults**: `object`

#### envelope.componentDefaults.roofWindow

> **roofWindow**: `object`

#### envelope.componentDefaults.roofWindow.factor

> **factor**: `number` = `0.93`

#### envelope.catalogs

> **catalogs**: `object`

#### envelope.catalogs.category1

> **category1**: `object`

#### envelope.catalogs.category1.roof\_massive

> **roof\_massive**: readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]

#### envelope.catalogs.category1.roof\_timber

> **roof\_timber**: readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]

#### envelope.catalogs.category1.topFloorCeiling\_massive

> **topFloorCeiling\_massive**: readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]

#### envelope.catalogs.category1.wall\_over\_20cm

> **wall\_over\_20cm**: readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]

#### envelope.catalogs.category1.lowestFloor\_concrete

> **lowestFloor\_concrete**: readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]

#### envelope.catalogs.category1.lowestFloor\_timber

> **lowestFloor\_timber**: readonly `Readonly`\<\{ `from?`: `number`; `to?`: `number`; `value`: `number`; \}\>[]

#### envelope.catalogs.category1.window\_wood\_double

> **window\_wood\_double**: (\{ `to`: `number`; `value`: `number`; `from?`: `undefined`; \} \| \{ `from`: `number`; `to`: `number`; `value`: `number`; \} \| \{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \})[]

#### envelope.catalogs.category1.window\_pvc\_iso

> **window\_pvc\_iso**: (\{ `from?`: `undefined`; `to`: `number`; `value`: `number`; \} \| \{ `from`: `number`; `to`: `number`; `value`: `number`; \} \| \{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \})[]

#### envelope.recommendations

> **recommendations**: `object`

#### envelope.recommendations.roof

> **roof**: (\{ `maxAge`: `number`; `action`: `"none"`; `reason`: `string`; `conditions?`: `undefined`; `minAge?`: `undefined`; `targetUValue?`: `undefined`; \} \| \{ `minAge`: `number`; `maxAge`: `number`; `conditions`: `object`[]; `action`: `"insulate"`; `reason`: `string`; `targetUValue`: `number`; \} \| \{ `conditions?`: `undefined`; `minAge`: `number`; `maxAge`: `number`; `action`: `"insulate"`; `reason`: `string`; `targetUValue`: `number`; \} \| \{ `conditions?`: `undefined`; `maxAge?`: `undefined`; `minAge`: `number`; `action`: `"full_renovation"`; `reason`: `string`; `targetUValue`: `number`; \})[]

#### envelope.recommendations.roofWindow

> **roofWindow**: (\{ `minAge?`: `undefined`; `targetUValue?`: `undefined`; `maxAge`: `number`; `action`: `"none"`; `reason`: `string`; \} \| \{ `maxAge?`: `undefined`; `minAge`: `number`; `action`: `"replace"`; `reason`: `string`; `targetUValue`: `number`; \})[]

#### envelope.recommendations.wall

> **wall**: (\{ `maxAge?`: `undefined`; `minAge?`: `undefined`; `targetUValue?`: `undefined`; `conditions`: (\{ `field`: `string`; `equals`: `true`; `max?`: `undefined`; \} \| \{ `equals?`: `undefined`; `field`: `string`; `max`: `number`; \})[]; `action`: `"none"`; `reason`: `string`; \} \| \{ `maxAge?`: `undefined`; `minAge?`: `undefined`; `conditions`: `object`[]; `action`: `"insulate"`; `reason`: `string`; `targetUValue`: `number`; \} \| \{ `maxAge?`: `undefined`; `minAge?`: `undefined`; `conditions`: `object`[]; `action`: `"replace_insulation"`; `reason`: `string`; `targetUValue`: `number`; \} \| \{ `conditions?`: `undefined`; `minAge?`: `undefined`; `targetUValue?`: `undefined`; `maxAge`: `number`; `action`: `"none"`; `reason`: `string`; \} \| \{ `conditions?`: `undefined`; `minAge`: `number`; `maxAge`: `number`; `action`: `"insulate"`; `reason`: `string`; `targetUValue`: `number`; \} \| \{ `conditions?`: `undefined`; `maxAge?`: `undefined`; `minAge`: `number`; `action`: `"full_renovation"`; `reason`: `string`; `targetUValue`: `number`; \})[]

#### envelope.recommendations.wallWindow

> **wallWindow**: (\{ `minAge?`: `undefined`; `targetUValue?`: `undefined`; `maxAge`: `number`; `action`: `"none"`; `reason`: `string`; \} \| \{ `maxAge?`: `undefined`; `minAge`: `number`; `action`: `"replace"`; `reason`: `string`; `targetUValue`: `number`; \})[]

#### envelope.recommendations.topFloorCeiling

> **topFloorCeiling**: (\{ `maxAge?`: `undefined`; `minAge?`: `undefined`; `targetUValue?`: `undefined`; `conditions`: (\{ `max?`: `undefined`; `field`: `string`; `equals`: `true`; \} \| \{ `equals?`: `undefined`; `field`: `string`; `max`: `number`; \})[]; `action`: `"none"`; `reason`: `string`; \} \| \{ `maxAge?`: `undefined`; `minAge?`: `undefined`; `conditions`: `object`[]; `action`: `"insulate"`; `reason`: `string`; `targetUValue`: `number`; \} \| \{ `maxAge?`: `undefined`; `minAge?`: `undefined`; `conditions`: `object`[]; `action`: `"full_renovation"`; `reason`: `string`; `targetUValue`: `number`; \} \| \{ `conditions?`: `undefined`; `minAge?`: `undefined`; `targetUValue?`: `undefined`; `maxAge`: `number`; `action`: `"none"`; `reason`: `string`; \} \| \{ `conditions?`: `undefined`; `maxAge?`: `undefined`; `minAge`: `number`; `action`: `"insulate"`; `reason`: `string`; `targetUValue`: `number`; \})[]

#### envelope.recommendations.lowestFloor

> **lowestFloor**: (\{ `maxAge?`: `undefined`; `minAge?`: `undefined`; `targetUValue?`: `undefined`; `conditions`: `object`[]; `action`: `"none"`; `reason`: `string`; \} \| \{ `maxAge?`: `undefined`; `minAge?`: `undefined`; `conditions`: `object`[]; `action`: `"insulate"`; `reason`: `string`; `targetUValue`: `number`; \} \| \{ `conditions?`: `undefined`; `minAge?`: `undefined`; `targetUValue?`: `undefined`; `maxAge`: `number`; `action`: `"none"`; `reason`: `string`; \} \| \{ `conditions?`: `undefined`; `maxAge?`: `undefined`; `minAge`: `number`; `action`: `"insulate"`; `reason`: `string`; `targetUValue`: `number`; \})[]

### heating

> **heating**: `object`

#### heating.referenceYear

> **referenceYear**: `number` = `2026`

#### heating.optimizeAfterYears

> **optimizeAfterYears**: `number` = `15`

#### heating.replaceAfterYears

> **replaceAfterYears**: `number` = `25`

#### heating.noActionTypes

> **noActionTypes**: `string`[]

#### heating.directReplaceTypes

> **directReplaceTypes**: `string`[]

#### heating.replacementByCarrier

> **replacementByCarrier**: `object`

#### heating.replacementByCarrier.oil

> **oil**: `string` = `"air_water_heat_pump"`

#### heating.replacementByCarrier.gas

> **gas**: `string` = `"air_water_heat_pump"`

#### heating.replacementByCarrier.biomass

> **biomass**: `string` = `"pellet_boiler"`

#### heating.replacementByCarrier.electricity

> **electricity**: `string` = `"air_water_heat_pump"`

#### heating.replacementByCarrier.district\_heating

> **district\_heating**: `string` = `"district_heating"`

#### heating.replacementByCarrier.other

> **other**: `string` = `"air_water_heat_pump"`

### energy

> **energy**: `object`

#### energy.usableAreaFactorFromVolume

> **usableAreaFactorFromVolume**: `number` = `0.32`

#### energy.internalGainWattsPerM2

> **internalGainWattsPerM2**: `number` = `5`

#### energy.heatingPeriodDays

> **heatingPeriodDays**: `number` = `185`

#### energy.degreeDayFactorMultiplier

> **degreeDayFactorMultiplier**: `number` = `0.024`

#### energy.ventilationCoefficient

> **ventilationCoefficient**: `number` = `0.34`

#### energy.defaultSolarGainUtilizationFactor

> **defaultSolarGainUtilizationFactor**: `number` = `1`

#### energy.domesticHotWaterDemandPerPersonKWhPerYear

> **domesticHotWaterDemandPerPersonKWhPerYear**: `number` = `500`

#### energy.occupancyAreaPerPersonM2

> **occupancyAreaPerPersonM2**: `number` = `40`

#### energy.defaultFinalEnergyFactor

> **defaultFinalEnergyFactor**: `number` = `1`

#### energy.defaultControlFactor

> **defaultControlFactor**: `number` = `1.095`

#### energy.generationFactorByHeatingType

> **generationFactorByHeatingType**: `object`

#### energy.generationFactorByHeatingType.standard\_boiler\_oil

> **standard\_boiler\_oil**: (\{ `from?`: `undefined`; `to`: `number`; `value`: `number`; \} \| \{ `from`: `number`; `to`: `number`; `value`: `number`; \} \| \{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \})[]

#### energy.generationFactorByHeatingType.standard\_boiler\_gas

> **standard\_boiler\_gas**: (\{ `from?`: `undefined`; `to`: `number`; `value`: `number`; \} \| \{ `from`: `number`; `to`: `number`; `value`: `number`; \} \| \{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \})[]

#### energy.generationFactorByHeatingType.low\_temp\_boiler\_oil

> **low\_temp\_boiler\_oil**: (\{ `from?`: `undefined`; `to`: `number`; `value`: `number`; \} \| \{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \})[]

#### energy.generationFactorByHeatingType.low\_temp\_boiler\_gas

> **low\_temp\_boiler\_gas**: (\{ `from?`: `undefined`; `to`: `number`; `value`: `number`; \} \| \{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \})[]

#### energy.generationFactorByHeatingType.condensing\_boiler\_gas

> **condensing\_boiler\_gas**: `object`[]

#### energy.generationFactorByHeatingType.condensing\_boiler\_oil

> **condensing\_boiler\_oil**: `object`[]

#### energy.generationFactorByHeatingType.log\_wood\_boiler

> **log\_wood\_boiler**: (\{ `from?`: `undefined`; `to`: `number`; `value`: `number`; \} \| \{ `from`: `number`; `to`: `number`; `value`: `number`; \} \| \{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \})[]

#### energy.generationFactorByHeatingType.pellet\_boiler

> **pellet\_boiler**: (\{ `from?`: `undefined`; `to`: `number`; `value`: `number`; \} \| \{ `from`: `number`; `to`: `number`; `value`: `number`; \} \| \{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \})[]

#### energy.generationFactorByHeatingType.water\_water\_heat\_pump

> **water\_water\_heat\_pump**: (\{ `from?`: `undefined`; `to`: `number`; `value`: `number`; \} \| \{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \})[]

#### energy.generationFactorByHeatingType.ground\_source\_heat\_pump

> **ground\_source\_heat\_pump**: (\{ `from?`: `undefined`; `to`: `number`; `value`: `number`; \} \| \{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \})[]

#### energy.generationFactorByHeatingType.air\_water\_heat\_pump

> **air\_water\_heat\_pump**: (\{ `from?`: `undefined`; `to`: `number`; `value`: `number`; \} \| \{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \})[]

#### energy.generationFactorByHeatingType.direct\_electric\_heating

> **direct\_electric\_heating**: `object`[]

#### energy.generationFactorByHeatingType.district\_heating

> **district\_heating**: `object`[]

#### energy.controlFactorByType

> **controlFactorByType**: `object`

#### energy.controlFactorByType.unregulated\_central\_flow

> **unregulated\_central\_flow**: `number` = `1.149`

#### energy.controlFactorByType.lead\_room\_or\_one\_pipe

> **lead\_room\_or\_one\_pipe**: `number` = `1.107`

#### energy.controlFactorByType.room\_temperature\_control

> **room\_temperature\_control**: `number` = `1.095`

#### energy.controlFactorByType.p\_controller\_pre\_1988

> **p\_controller\_pre\_1988**: `number` = `1.083`

#### energy.controlFactorByType.p\_or\_two\_point

> **p\_or\_two\_point**: `number` = `1.042`

#### energy.controlFactorByType.pi\_controller

> **pi\_controller**: `number` = `1.042`

#### energy.controlFactorByType.pid\_optimized

> **pid\_optimized**: `number` = `1.03`

#### energy.emitterFactorAdjustmentByType

> **emitterFactorAdjustmentByType**: `object`

#### energy.emitterFactorAdjustmentByType.underfloor\_wet

> **underfloor\_wet**: `number` = `0.021`

#### energy.emitterFactorAdjustmentByType.underfloor\_dry

> **underfloor\_dry**: `number` = `0.012`

#### energy.emitterFactorAdjustmentByType.underfloor\_low\_cover

> **underfloor\_low\_cover**: `number` = `0.006`

#### energy.emitterFactorAdjustmentByType.wall\_heating

> **wall\_heating**: `number` = `0.045`

#### energy.emitterFactorAdjustmentByType.ceiling\_heating

> **ceiling\_heating**: `number` = `0.063`

#### energy.emitterFactorAdjustmentByType.mechanical\_ventilation\_heating

> **mechanical\_ventilation\_heating**: `number` = `0`

#### energy.emitterFactorAdjustmentByType.radiator

> **radiator**: `number` = `0`

#### energy.flowTemperatureAdjustmentBands

> **flowTemperatureAdjustmentBands**: (\{ `to?`: `undefined`; `from`: `number`; `value`: `number`; \} \| \{ `from`: `number`; `to`: `number`; `value`: `number`; \} \| \{ `from?`: `undefined`; `to`: `number`; `value`: `number`; \})[]

#### energy.radiatorPositionAdjustmentByType

> **radiatorPositionAdjustmentByType**: `object`

#### energy.radiatorPositionAdjustmentByType.inside\_wall

> **inside\_wall**: `number` = `0.039`

#### energy.radiatorPositionAdjustmentByType.glass\_without\_shield

> **glass\_without\_shield**: `number` = `0.051`

#### energy.radiatorPositionAdjustmentByType.glass\_with\_shield

> **glass\_with\_shield**: `number` = `0.036`

#### energy.radiatorPositionAdjustmentByType.exterior\_wall

> **exterior\_wall**: `number` = `0.009`

#### energy.intermittentAdjustmentByEmitterType

> **intermittentAdjustmentByEmitterType**: `object`

#### energy.intermittentAdjustmentByEmitterType.radiator

> **radiator**: `number` = `-0.018`

#### energy.singleRoomControlAdjustmentByType

> **singleRoomControlAdjustmentByType**: `object`

#### energy.singleRoomControlAdjustmentByType.independent

> **independent**: `number` = `-0.03`

#### energy.singleRoomControlAdjustmentByType.self\_adjusting

> **self\_adjusting**: `number` = `-0.06`

#### energy.singleRoomControlAdjustmentByType.networked

> **networked**: `number` = `-0.072`

#### energy.primaryEnergyFactorByCarrier

> **primaryEnergyFactorByCarrier**: `object`

#### energy.primaryEnergyFactorByCarrier.oil

> **oil**: `number` = `1.1`

#### energy.primaryEnergyFactorByCarrier.gas

> **gas**: `number` = `1.1`

#### energy.primaryEnergyFactorByCarrier.biomass

> **biomass**: `number` = `0.2`

#### energy.primaryEnergyFactorByCarrier.electricity

> **electricity**: `number` = `1.8`

#### energy.primaryEnergyFactorByCarrier.district\_heating

> **district\_heating**: `number` = `0.7`

#### energy.primaryEnergyFactorByCarrier.other

> **other**: `number` = `1`

#### energy.fuelCarrierProfileByCarrier

> **fuelCarrierProfileByCarrier**: `object`

#### energy.fuelCarrierProfileByCarrier.oil

> **oil**: `object`

#### energy.fuelCarrierProfileByCarrier.oil.unit

> **unit**: `string` = `"l"`

#### energy.fuelCarrierProfileByCarrier.oil.unitsPerKWh

> **unitsPerKWh**: `number` = `0.1`

#### energy.fuelCarrierProfileByCarrier.oil.pricePerUnit

> **pricePerUnit**: `number` = `1.1`

#### energy.fuelCarrierProfileByCarrier.oil.co2KgPerUnit

> **co2KgPerUnit**: `number` = `2.66`

#### energy.fuelCarrierProfileByCarrier.gas

> **gas**: `object`

#### energy.fuelCarrierProfileByCarrier.gas.unit

> **unit**: `string` = `"m3"`

#### energy.fuelCarrierProfileByCarrier.gas.unitsPerKWh

> **unitsPerKWh**: `number` = `0.1`

#### energy.fuelCarrierProfileByCarrier.gas.pricePerUnit

> **pricePerUnit**: `number` = `1.2`

#### energy.fuelCarrierProfileByCarrier.gas.co2KgPerUnit

> **co2KgPerUnit**: `number` = `2.02`

#### energy.fuelCarrierProfileByCarrier.biomass

> **biomass**: `object`

#### energy.fuelCarrierProfileByCarrier.biomass.unit

> **unit**: `string` = `"kg"`

#### energy.fuelCarrierProfileByCarrier.biomass.unitsPerKWh

> **unitsPerKWh**: `number` = `0.2`

#### energy.fuelCarrierProfileByCarrier.biomass.pricePerUnit

> **pricePerUnit**: `number` = `0.4`

#### energy.fuelCarrierProfileByCarrier.biomass.co2KgPerUnit

> **co2KgPerUnit**: `number` = `0.18`

#### energy.fuelCarrierProfileByCarrier.electricity

> **electricity**: `object`

#### energy.fuelCarrierProfileByCarrier.electricity.unit

> **unit**: `string` = `"kWh"`

#### energy.fuelCarrierProfileByCarrier.electricity.unitsPerKWh

> **unitsPerKWh**: `number` = `1`

#### energy.fuelCarrierProfileByCarrier.electricity.pricePerUnit

> **pricePerUnit**: `number` = `0.35`

#### energy.fuelCarrierProfileByCarrier.electricity.co2KgPerUnit

> **co2KgPerUnit**: `number` = `0.38`

#### energy.fuelCarrierProfileByCarrier.district\_heating

> **district\_heating**: `object`

#### energy.fuelCarrierProfileByCarrier.district\_heating.unit

> **unit**: `string` = `"kWh"`

#### energy.fuelCarrierProfileByCarrier.district\_heating.unitsPerKWh

> **unitsPerKWh**: `number` = `1`

#### energy.fuelCarrierProfileByCarrier.district\_heating.pricePerUnit

> **pricePerUnit**: `number` = `0.15`

#### energy.fuelCarrierProfileByCarrier.district\_heating.co2KgPerUnit

> **co2KgPerUnit**: `number` = `0.25`

#### energy.fuelCarrierProfileByCarrier.other

> **other**: `object`

#### energy.fuelCarrierProfileByCarrier.other.unit

> **unit**: `string` = `"kWh"`

#### energy.fuelCarrierProfileByCarrier.other.unitsPerKWh

> **unitsPerKWh**: `number` = `1`

#### energy.fuelCarrierProfileByCarrier.other.pricePerUnit

> **pricePerUnit**: `number` = `0.12`

#### energy.fuelCarrierProfileByCarrier.other.co2KgPerUnit

> **co2KgPerUnit**: `number` = `0.25`
