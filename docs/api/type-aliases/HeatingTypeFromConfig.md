[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / HeatingTypeFromConfig

# Type Alias: HeatingTypeFromConfig\<TConfig\>

> **HeatingTypeFromConfig**\<`TConfig`\> = [`LiteralUnion`](LiteralUnion.md)\<`Extract`\<`TConfig`\[`"noActionTypes"`\]\[`number`\], `string`\> \| `Extract`\<`TConfig`\[`"directReplaceTypes"`\]\[`number`\], `string`\> \| `Extract`\<`TConfig`\[`"replacementByCarrier"`\]\[keyof `TConfig`\[`"replacementByCarrier"`\]\], `string`\> \| `Extract`\<`NonNullable`\<`TConfig`\[`"rules"`\]\>\[`number`\]\[`"preferredReplacement"`\], `string`\>\>

Defined in: [heating/types.ts:30](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/9a396a5d12cb19bc95d75d3a7e738b0448388936/src/heating/types.ts#L30)

Known heating-type literals derived from heating config only.

## Type Parameters

### TConfig

`TConfig` *extends* [`HeatingConfig`](HeatingConfig.md)
