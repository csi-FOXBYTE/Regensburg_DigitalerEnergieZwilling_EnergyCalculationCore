import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";
import { resolveRangeBand } from "../../../types/range-bands.js";

declare module "../" {
  interface DETCalculatorRegistry {
    temperatureControlPerformanceFactor: number;
  }
}

export default {
  key: "temperatureControlPerformanceFactor",
  resolve: (ctx) => {
    const byEmitterType = resolveKeyedValue(
      ctx.input.config.heat.temperatureControlPerformanceFactor,
      ctx.get("heatEmitterType"),
    );
    const byYear = resolveRangeBand(byEmitterType, ctx.get("heatingSystemConstructionYear"));
    if (byYear == null) throw new Error("Failed to resolve temperatureControlPerformanceFactor for given year");
    return resolveKeyedValue(byYear, ctx.get("heatingSurfaceType"));
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "temperatureControlPerformanceFactor"
>;
