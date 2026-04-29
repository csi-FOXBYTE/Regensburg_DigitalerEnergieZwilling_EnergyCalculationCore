import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    electricalHeatingDemand: number;
  }
}

export default {
  key: "electricalHeatingDemand",
  resolve: (ctx) =>
    ctx.get("heatingEnergyDemand") * ctx.get("electricalRatio"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "electricalHeatingDemand"
>;
