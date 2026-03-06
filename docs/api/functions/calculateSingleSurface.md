[**@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore**](../README.md)

***

[@csi-foxbyte/Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore](../README.md) / calculateSingleSurface

# Function: calculateSingleSurface()

> **calculateSingleSurface**(`input`, `rules`, `component`, `config`): [`SingleSurfaceResult`](../type-aliases/SingleSurfaceResult.md)

Defined in: envelope/calculators.ts:99

Calculates a single surface transmission heat loss block.

## Parameters

### input

[`SurfaceInput`](../type-aliases/SurfaceInput.md)

Single surface input values.

### rules

readonly `Readonly`\<\{ `minAge?`: `number`; `maxAge?`: `number`; `action`: [`RecommendationAction`](../type-aliases/RecommendationAction.md); `reason`: `string`; `targetUValue?`: `number`; \}\>[]

Age-based recommendation rules for this component.

### component

`string`

Component identifier used in recommendation output.

### config

[`EnvelopeConfig`](../type-aliases/EnvelopeConfig.md)

Envelope calculation configuration.

## Returns

[`SingleSurfaceResult`](../type-aliases/SingleSurfaceResult.md)

Surface HT result plus optional recommendation.
