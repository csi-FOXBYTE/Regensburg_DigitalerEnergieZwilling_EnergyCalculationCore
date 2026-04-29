import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    internalGainsFactor: number;
  }
}

export default {
  key: "internalGainsFactor",
  resolve: (ctx) => {
    if (!ctx.get("hasInternalGains")) return 1;
    return resolveKeyedValue(
      ctx.input.config.heat.internalGainsFactorByBuildingType,
      ctx.get("buildingType"),
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "internalGainsFactor"
>;
