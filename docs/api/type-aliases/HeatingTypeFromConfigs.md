[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / HeatingTypeFromConfigs

# Type Alias: HeatingTypeFromConfigs\<THeatingConfig, TEnergyConfig\>

> **HeatingTypeFromConfigs**\<`THeatingConfig`, `TEnergyConfig`\> = [`LiteralUnion`](LiteralUnion.md)\<`Extract`\<`THeatingConfig`\[`"noActionTypes"`\]\[`number`\], `string`\> \| `Extract`\<`THeatingConfig`\[`"directReplaceTypes"`\]\[`number`\], `string`\> \| `Extract`\<`THeatingConfig`\[`"replacementByCarrier"`\]\[keyof `THeatingConfig`\[`"replacementByCarrier"`\]\], `string`\> \| `Extract`\<`NonNullable`\<`THeatingConfig`\[`"rules"`\]\>\[`number`\]\[`"preferredReplacement"`\], `string`\> \| `Extract`\<keyof `TEnergyConfig`\[`"generationFactorByHeatingType"`\], `string`\>\>

Defined in: [heating/types.ts:42](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/heating/types.ts#L42)

Known heating-type literals derived from heating config plus energy config.

## Type Parameters

### THeatingConfig

`THeatingConfig` *extends* [`HeatingConfig`](HeatingConfig.md)

### TEnergyConfig

`TEnergyConfig` *extends* `Readonly`\<\{ `generationFactorByHeatingType`: `Readonly`\<`Record`\<`string`, readonly `unknown`[]\>\>; \}\>
