[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / HeatingTypeFromConfig

# Type Alias: HeatingTypeFromConfig\<TConfig\>

> **HeatingTypeFromConfig**\<`TConfig`\> = [`LiteralUnion`](LiteralUnion.md)\<`Extract`\<`TConfig`\[`"noActionTypes"`\]\[`number`\], `string`\> \| `Extract`\<`TConfig`\[`"directReplaceTypes"`\]\[`number`\], `string`\> \| `Extract`\<`TConfig`\[`"replacementByCarrier"`\]\[keyof `TConfig`\[`"replacementByCarrier"`\]\], `string`\> \| `Extract`\<`NonNullable`\<`TConfig`\[`"rules"`\]\>\[`number`\]\[`"preferredReplacement"`\], `string`\>\>

Defined in: [heating/types.ts:30](https://github.com/csi-FOXBYTE/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore/blob/0f9e37122197f8ca7609ecce54dd10328f548380/src/heating/types.ts#L30)

Known heating-type literals derived from heating config only.

## Type Parameters

### TConfig

`TConfig` *extends* [`HeatingConfig`](HeatingConfig.md)
