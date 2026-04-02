import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    netFloorAreaFromUsableFloorAreaFactor: number;
  }
}

export default {
  key: "netFloorAreaFromUsableFloorAreaFactor",
  resolve: (ctx) => {
    const byBuildingType = resolveKeyedValue(
      ctx.input.config.general.netFloorAreaFromUsableFloorAreaFactor,
      ctx.get("buildingType"),
    );
    return resolveKeyedValue(byBuildingType, ctx.get("isBasementHeated"));
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "netFloorAreaFromUsableFloorAreaFactor"
>;
