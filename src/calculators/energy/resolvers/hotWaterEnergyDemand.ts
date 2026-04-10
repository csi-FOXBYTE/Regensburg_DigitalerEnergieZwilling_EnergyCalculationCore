import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    hotWaterEnergyDemand: number;
  }
}

export default {
  key: "hotWaterEnergyDemand",
  resolve: (ctx) =>
    ctx.get("netFloorArea") * ctx.get("hotWaterEnergyDemandFromAreaFactor"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "hotWaterEnergyDemand"
>;
