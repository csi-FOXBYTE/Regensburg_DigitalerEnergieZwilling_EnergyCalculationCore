import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    preliminaryHeatingEnergyDemand: number;
  }
}

export default {
  key: "preliminaryHeatingEnergyDemand",
  resolve: (ctx) =>
    ctx.get("heatLossSum") * ctx.get("heatingDegreeDays") * 0.024,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "preliminaryHeatingEnergyDemand"
>;
