import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";
import { resolveRangeBand } from "../../../types/range-bands.js";

declare module "../" {
  interface DETCalculatorRegistry {
    heatingPerformanceFactor: number;
  }
}

export default {
  key: "heatingPerformanceFactor",
  resolve: (ctx) => {
    const byEmitterType = resolveKeyedValue(
      ctx.input.config.heat.heatingPerformanceFactor,
      ctx.get("heatEmitterType"),
    );
    const byYear = resolveRangeBand(byEmitterType, ctx.get("heatingSystemConstructionYear"));
    if (byYear == null) throw new Error("Failed to resolve heatingPerformanceFactor for given year");
    const result = resolveRangeBand(byYear, ctx.get("usableFloorArea"));
    if (result == null) throw new Error("Failed to resolve heatingPerformanceFactor for given floor area");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatingPerformanceFactor"
>;
