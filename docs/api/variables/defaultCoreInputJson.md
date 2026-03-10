[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / defaultCoreInputJson

# Variable: defaultCoreInputJson

> `const` **defaultCoreInputJson**: `object`

Defined in: [config/default-core-input.ts:10](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/config/default-core-input.ts#L10)

Default example input used as the configurator baseline.

## Type Declaration

### roofWindow

> **roofWindow**: `object`

#### roofWindow.roof

> **roof**: `object`

#### roofWindow.roof.catalog

> **catalog**: `"category1"` = `"category1"`

#### roofWindow.roof.construction

> **construction**: `"roof_massive"` = `"roof_massive"`

#### roofWindow.roof.year

> **year**: `number` = `1985`

#### roofWindow.roof.area

> **area**: `number` = `120`

#### roofWindow.roofWindow

> **roofWindow**: `object`

#### roofWindow.roofWindow.catalog

> **catalog**: `"category1"` = `"category1"`

#### roofWindow.roofWindow.construction

> **construction**: `"window_pvc_iso"` = `"window_pvc_iso"`

#### roofWindow.roofWindow.year

> **year**: `number` = `2002`

#### roofWindow.roofWindow.area

> **area**: `number` = `18`

#### roofWindow.envelopeArea

> **envelopeArea**: `number` = `150`

### wallWindow

> **wallWindow**: `object`

#### wallWindow.wall

> **wall**: `object`

#### wallWindow.wall.catalog

> **catalog**: `"category1"` = `"category1"`

#### wallWindow.wall.construction

> **construction**: `"wall_over_20cm"` = `"wall_over_20cm"`

#### wallWindow.wall.year

> **year**: `number` = `1975`

#### wallWindow.wall.area

> **area**: `number` = `180`

#### wallWindow.window

> **window**: `object`

#### wallWindow.window.catalog

> **catalog**: `"category1"` = `"category1"`

#### wallWindow.window.construction

> **construction**: `"window_wood_double"` = `"window_wood_double"`

#### wallWindow.window.year

> **year**: `number` = `1998`

#### wallWindow.window.area

> **area**: `number` = `32`

#### wallWindow.envelopeArea

> **envelopeArea**: `number` = `212`

### topFloorCeiling

> **topFloorCeiling**: `object`

#### topFloorCeiling.catalog

> **catalog**: `"category1"` = `"category1"`

#### topFloorCeiling.construction

> **construction**: `"topFloorCeiling_massive"` = `"topFloorCeiling_massive"`

#### topFloorCeiling.year

> **year**: `number` = `1975`

#### topFloorCeiling.area

> **area**: `number` = `110`

### lowestFloor

> **lowestFloor**: `object`

#### lowestFloor.catalog

> **catalog**: `"category1"` = `"category1"`

#### lowestFloor.construction

> **construction**: `"lowestFloor_concrete"` = `"lowestFloor_concrete"`

#### lowestFloor.year

> **year**: `number` = `1975`

#### lowestFloor.area

> **area**: `number` = `110`

### aggregateReferenceAreaOverride

> **aggregateReferenceAreaOverride**: `number` = `582`

### heating

> **heating**: `object`

#### heating.mode

> **mode**: `"central"` = `"central"`

#### heating.primaryCarrier

> **primaryCarrier**: `"gas"` = `"gas"`

#### heating.primaryType

> **primaryType**: `string` = `"standard_boiler_gas"`

#### heating.yearOfConstruction

> **yearOfConstruction**: `number` = `1995`

#### heating.details

> **details**: `object`

#### heating.details.controlType

> **controlType**: `string` = `"room_temperature_control"`

#### heating.details.emitterType

> **emitterType**: `string` = `"radiator"`

#### heating.details.flowTemperatureC

> **flowTemperatureC**: `number` = `70`

#### heating.details.radiatorPosition

> **radiatorPosition**: `string` = `"exterior_wall"`

#### heating.details.intermittentOperation

> **intermittentOperation**: `true` = `true`

#### heating.details.singleRoomControlType

> **singleRoomControlType**: `string` = `"independent"`

### energy

> **energy**: `object`

#### energy.degreeDaysKdPerA

> **degreeDaysKdPerA**: `number` = `3000`

#### energy.heatedAirVolumeM3

> **heatedAirVolumeM3**: `number` = `700`

#### energy.airChangeRate

> **airChangeRate**: `number` = `0.5`

#### energy.peopleCount

> **peopleCount**: `number` = `4`

#### energy.solarGainEntries

> **solarGainEntries**: `object`[]
