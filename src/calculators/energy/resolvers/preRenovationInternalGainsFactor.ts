import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    preRenovationInternalGainsFactor: number;
  }
}

export default {
  key: "preRenovationInternalGainsFactor",
  resolve: (ctx) => {
    if (!ctx.get("preRenovationHasInternalGains")) return 1;
    return resolveKeyedValue(
      ctx.input.config.heat.internalGainsFactorByBuildingType,
      ctx.get("buildingType"),
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "preRenovationInternalGainsFactor"
>;
