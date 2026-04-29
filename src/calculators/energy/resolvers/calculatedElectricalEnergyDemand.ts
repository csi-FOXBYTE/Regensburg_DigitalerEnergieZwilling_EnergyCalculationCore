import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    calculatedElectricalEnergyDemand: number;
  }
}

export default {
  key: "calculatedElectricalEnergyDemand",
  resolve: (ctx) =>
    ctx.get("effectiveHeatingDemand") * ctx.get("electricalRatio"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "calculatedElectricalEnergyDemand"
>;
