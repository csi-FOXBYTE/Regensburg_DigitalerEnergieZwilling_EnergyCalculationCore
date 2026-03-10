[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / HeatingInput

# Type Alias: HeatingInput\<THeatingType\>

> **HeatingInput**\<`THeatingType`\> = `Readonly`\<\{ `mode`: [`HeatingMode`](HeatingMode.md); `primaryCarrier`: [`EnergyCarrier`](EnergyCarrier.md); `primaryType`: `THeatingType`; `yearOfConstruction?`: `number`; `secondaryCarrier?`: [`EnergyCarrier`](EnergyCarrier.md); `secondaryType?`: `THeatingType`; `details?`: [`HeatingDetails`](HeatingDetails.md); \}\>

Defined in: [heating/types.ts:60](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/heating/types.ts#L60)

Input payload for heating evaluation.

## Type Parameters

### THeatingType

`THeatingType` *extends* `string` = `string`
