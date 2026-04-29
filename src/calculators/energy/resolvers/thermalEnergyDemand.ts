import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    thermalEnergyDemand: number;
  }
}

export default {
  key: "thermalEnergyDemand",
  resolve: (ctx) =>
    ctx.get("totalEnergyDemand") * (1 - ctx.get("electricalRatio")),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "thermalEnergyDemand"
>;
