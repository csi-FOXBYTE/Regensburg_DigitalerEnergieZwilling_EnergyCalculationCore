import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";
import { resolveRangeBand } from "../../../types/range-bands.js";

declare module "../" {
  interface DETCalculatorRegistry {
    heatCircuitTemperature: number;
  }
}

export default {
  key: "heatCircuitTemperature",
  resolve: (ctx) => {
    const byEmitterType = resolveKeyedValue(
      ctx.input.config.heat.heatCircuitTemperature,
      ctx.get("heatEmitterType"),
    );
    const result = resolveRangeBand(byEmitterType, ctx.get("heatingSystemConstructionYear"));
    if (result == null) throw new Error("Failed to resolve heatCircuitTemperature");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatCircuitTemperature"
>;
